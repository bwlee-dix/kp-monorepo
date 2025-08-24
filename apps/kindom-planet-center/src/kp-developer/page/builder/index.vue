<script setup lang="ts">
import { useDarkmode } from '/@dds/stores/darkmode'

import VueScrollTo from 'vue-scrollto'
import { useNotyf } from '/@dds/composable/useNotyf'
import sleep from '/@dds/utils/sleep'
import { ref, watch, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'

// Field interface
interface Field {
  id: string
  name: string
  description: string
  type: string
  required: boolean
  options?: string[]
}

const router = useRouter()
const notyf = useNotyf()
const { scrollTo } = VueScrollTo

const currentStep = ref(0)
const currentHelp = ref(-1)
const isB2C = ref(true)
const type = ref('')
const options = ref<string[]>([])

// App information
const appName = ref('')
const appDescription = ref('')

// Field data
const fieldName = ref('')
const fieldDescription = ref('')
const fieldRequired = ref(false)

// Page management
const pages = ref<
  Array<{ id: string; name: string; description: string; fields: Field[] }>
>([])
const currentPageId = ref<string>('')
const newPageName = ref('')
const newPageDescription = ref('')

// Edit mode
const isEditMode = ref(false)
const editingFieldId = ref<string | null>(null)

// Validation state
const isValidationInProgress = ref(false)
const currentExecutionId = ref<string | null>(null)
const isExecuting = ref(false)

// Add computed property for execution state

// Watch for type changes and reset options
watch(type, (newType) => {
  if (newType === 'Radio' || newType === 'Multi-Select') {
    // Initialize with one empty option for Radio/Multi-Select
    options.value = ['']
  } else {
    // Clear options for other types
    options.value = []
  }
})

const validateStep = async () => {
  if (currentStep.value === 1) {
    // Validate that at least one page exists
    if (pages.value.length === 0) {
      notyf.error('Please add at least one page before proceeding')
      return
    }

    if (isLoading.value) {
      return
    }
  }

  if (currentStep.value === 2) {
    // Validate that all fields have valid options
    const currentPage = getCurrentPage()
    if (currentPage && currentPage.fields.length > 0) {
      for (const field of currentPage.fields) {
        if (field.type === 'Radio' || field.type === 'Multi-Select') {
          if (
            !field.options ||
            field.options.length === 0 ||
            field.options.every((option) => !option.trim())
          ) {
            notyf.error(`Field "${field.name}" must have at least one valid option`)
            return
          }
        }
      }
    }

    if (isLoading.value) {
      return
    }
  }

  if (currentStep.value === 3) {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    notyf.success('Web builder configuration completed successfully!')

    // Save builder configuration to localStorage for preview
    const builderConfig = {
      pages: pages.value,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('builderConfig', JSON.stringify(builderConfig))

    // Wait longer to ensure localStorage is saved and navigation is ready
    await sleep(2000)

    await router.push('/body/dashboard')
    return
  }
  // if (currentStep.value === 4) {
  //   if (isLoading.value) {
  //     return
  //   }

  //   isLoading.value = true
  //   notyf.success('Your shipment is successfully stored!')
  //   await sleep(1000)

  //   router.push('/sidebar/dashboards')
  //   return
  // }

  isLoading.value = true
  await sleep(400)
  currentStep.value += 1

  nextTick(() => {
    scrollTo(`#form-step-${currentStep.value}`, 1000)
    isLoading.value = false
  })
}

const addOption = () => {
  // Only add if the last option is not empty
  if (options.value.length === 0 || options.value[options.value.length - 1] !== '') {
    options.value.push('')
  }
}

const removeOption = (index: number) => {
  options.value.splice(index, 1)
  // Ensure at least one option remains for Radio/Multi-Select
  if (
    options.value.length === 0 &&
    (type.value === 'Radio' || type.value === 'Multi-Select')
  ) {
    options.value = ['']
  }
}

const validateFieldForm = () => {
  const errors: string[] = []

  if (!fieldName.value.trim()) {
    errors.push('Field name is required')
  }

  if (!type.value) {
    errors.push('Field type is required')
  }

  // Check options for Radio and Multi-Select
  if (type.value === 'Radio' || type.value === 'Multi-Select') {
    if (!options.value.length) {
      errors.push('At least one option is required for Radio/Multi-Select fields')
    } else {
      // Check if any option is empty or only whitespace
      const hasEmptyOption = options.value.some((option) => !option.trim())
      if (hasEmptyOption) {
        errors.push('All options must have valid text. Empty options are not allowed.')
      }
    }
  }

  return errors
}

const resetForm = () => {
  fieldName.value = ''
  fieldDescription.value = ''
  type.value = ''
  fieldRequired.value = false
  options.value = []
  isEditMode.value = false
  editingFieldId.value = null
  isValidationInProgress.value = false
  currentExecutionId.value = null
  isExecuting.value = false
}

// Page management functions
const addNewPage = () => {
  console.log('addNewPage executed', new Date().getTime())

  if (!newPageName.value.trim()) {
    notyf.error('Page name is required')
    return
  }

  const newPage = {
    id: Date.now().toString(),
    name: newPageName.value.trim(),
    description: newPageDescription.value.trim(),
    fields: [],
  }

  pages.value.push(newPage)

  // Set as current page if it's the first page
  if (pages.value.length === 1) {
    currentPageId.value = newPage.id
    console.log('Set currentPageId to:', currentPageId.value)
  }

  // Reset form
  newPageName.value = ''
  newPageDescription.value = ''

  console.log('Pages after adding:', pages.value)
  console.log('Current page ID:', currentPageId.value)
  console.log('Current page fields:', getCurrentPageFields())

  notyf.success('Page added successfully!')
}

const switchPage = (pageId: string) => {
  currentPageId.value = pageId
  // Clear current field form when switching pages
  resetForm()
}

const getCurrentPage = () => {
  return pages.value.find((page) => page.id === currentPageId.value)
}

const getCurrentPageFields = () => {
  const currentPage = getCurrentPage()
  return currentPage ? currentPage.fields : []
}

const editPage = (page: any) => {
  newPageName.value = page.name
  newPageDescription.value = page.description
  // Set edit mode for page
  editingPageId.value = page.id
}

const updatePage = () => {
  if (!newPageName.value.trim()) {
    notyf.error('Page name is required')
    return
  }

  const index = pages.value.findIndex((page) => page.id === editingPageId.value)
  if (index > -1) {
    pages.value[index] = {
      ...pages.value[index],
      name: newPageName.value.trim(),
      description: newPageDescription.value.trim(),
    }

    // Reset form
    newPageName.value = ''
    newPageDescription.value = ''
    editingPageId.value = null

    notyf.success('Page updated successfully!')
  }
}

const cancelPageEdit = () => {
  newPageName.value = ''
  newPageDescription.value = ''
  editingPageId.value = null
}

const removePage = (pageId: string) => {
  const index = pages.value.findIndex((page) => page.id === pageId)
  if (index > -1) {
    pages.value.splice(index, 1)
    if (currentPageId.value === pageId) {
      currentPageId.value = pages.value.length > 0 ? pages.value[0].id : '1'
    }
    notyf.success('Page removed successfully!')
  }
}

// Add editingPageId for page editing
const editingPageId = ref<string | null>(null)

// Preview modal state
const showPreviewModal = ref(false)
const currentPreviewPageId = ref('')
const previewFormData = ref<Record<string, any>>({})

// Update field management to work with current page
const addField = async () => {
  // Prevent multiple executions
  if (isLoading.value || isValidationInProgress.value) {
    return
  }

  isValidationInProgress.value = true
  isLoading.value = true

  try {
    // Validate form
    const errors = validateFieldForm()

    // If there are validation errors, show them all at once
    if (errors.length > 0) {
      notyf.error(errors.join('. '))
      return
    }

    const newField = {
      id: Date.now().toString(),
      name: fieldName.value.trim(),
      description: fieldDescription.value.trim(),
      type: type.value,
      required: fieldRequired.value,
      options:
        type.value === 'Radio' || type.value === 'Multi-Select'
          ? [...options.value]
          : undefined,
    }

    // Add field to current page
    const currentPage = getCurrentPage()
    if (currentPage) {
      currentPage.fields.push(newField)
    }

    // Reset form
    resetForm()
    notyf.success('Field added successfully!')
  } finally {
    isLoading.value = false
    isValidationInProgress.value = false
  }
}

const updateField = async () => {
  // Prevent multiple executions
  if (isLoading.value || isValidationInProgress.value) {
    return
  }

  isValidationInProgress.value = true
  isLoading.value = true

  try {
    // Validate form
    const errors = validateFieldForm()

    // If there are validation errors, show them all at once
    if (errors.length > 0) {
      notyf.error(errors.join('. '))
      return
    }

    const currentPage = getCurrentPage()
    if (currentPage) {
      const index = currentPage.fields.findIndex(
        (field) => field.id === editingFieldId.value
      )
      if (index > -1) {
        currentPage.fields[index] = {
          ...currentPage.fields[index],
          name: fieldName.value.trim(),
          description: fieldDescription.value.trim(),
          type: type.value,
          required: fieldRequired.value,
          options:
            type.value === 'Radio' || type.value === 'Multi-Select'
              ? [...options.value]
              : undefined,
        }

        resetForm()
        notyf.success('Field updated successfully!')
      }
    }
  } finally {
    isLoading.value = false
    isValidationInProgress.value = false
  }
}

const cancelEdit = () => {
  resetForm()
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Text':
      return 'info'
    case 'Number':
      return 'success'
    case 'Date':
      return 'warning'
    case 'Address':
      return 'primary'
    case 'Radio':
      return 'purple'
    case 'Multi-Select':
      return 'orange'
    case 'Textarea':
      return 'info'
    default:
      return 'light'
  }
}

const handleAddField = () => {
  console.log('handleAddField called', new Date().getTime())
  console.log('isExecuting:', isExecuting.value)

  // Immediately set executing flag to prevent duplicate calls
  if (isExecuting.value) {
    console.log('Already executing, skipping...')
    return
  }

  // Set flag immediately and synchronously
  isExecuting.value = true
  console.log('Setting isExecuting to true')

  // Use nextTick to ensure the flag is set before any other processing
  nextTick(() => {
    try {
      addField()
    } finally {
      // Use longer delay to prevent VButton's multiple event handling
      setTimeout(() => {
        isExecuting.value = false
        console.log('Reset isExecuting to false')
      }, 300)
    }
  })
}

const handleUpdateField = () => {
  console.log('handleUpdateField called', new Date().getTime())
  console.log('isExecuting:', isExecuting.value)

  // Immediately set executing flag to prevent duplicate calls
  if (isExecuting.value) {
    console.log('Already executing, skipping...')
    return
  }

  // Set flag immediately and synchronously
  isExecuting.value = true
  console.log('Setting isExecuting to true')

  // Use nextTick to ensure the flag is set before any other processing
  nextTick(() => {
    try {
      updateField()
    } finally {
      // Use longer delay to prevent VButton's multiple event handling
      setTimeout(() => {
        isExecuting.value = false
        console.log('Reset isExecuting to false')
      }, 300)
    }
  })
}

const removeField = (fieldId: string) => {
  const currentPage = getCurrentPage()
  if (currentPage) {
    const index = currentPage.fields.findIndex((field) => field.id === fieldId)
    if (index > -1) {
      currentPage.fields.splice(index, 1)
      notyf.success('Field removed successfully!')
    }
  }
}

const editField = (field: any) => {
  isEditMode.value = true
  editingFieldId.value = field.id
  fieldName.value = field.name
  fieldDescription.value = field.description
  type.value = field.type
  fieldRequired.value = field.required
  options.value = field.options ? [...field.options] : []

  // Scroll to form (Form Items step)
  nextTick(() => {
    scrollTo('#form-step-2', 400, { offset: 150 })
  })
}

const isLoading = ref(false)
const darkmode = useDarkmode()

useHead({
  title: 'Register Developer - Kingdom Planet',
})

const handleAddPage = () => {
  console.log('handleAddPage called', new Date().getTime())
  console.log('isExecuting:', isExecuting.value)

  // Immediately set executing flag to prevent duplicate calls
  if (isExecuting.value) {
    console.log('Already executing, skipping...')
    return
  }

  isExecuting.value = true
  console.log('Setting isExecuting to true')

  try {
    addNewPage()
  } finally {
    // Ensure flag is reset after execution
    setTimeout(() => {
      isExecuting.value = false
      console.log('Reset isExecuting to false')
    }, 100)
  }
}

const handleUpdatePage = () => {
  // Immediately set executing flag to prevent duplicate calls
  if (isExecuting.value) {
    return
  }

  isExecuting.value = true

  try {
    updatePage()
  } finally {
    // Ensure flag is reset after execution
    setTimeout(() => {
      isExecuting.value = false
    }, 100)
  }
}

// Preview modal functions
const openPreviewModal = () => {
  console.log('openPreviewModal called')
  console.log('pages.value:', pages.value)
  console.log('pages.value.length:', pages.value.length)

  if (pages.value.length === 0) {
    console.log('No pages found, showing error')
    notyf.error('Please add at least one page before previewing')
    return
  }

  // Set first page as current preview page
  currentPreviewPageId.value = pages.value[0].id
  console.log('Set currentPreviewPageId to:', currentPreviewPageId.value)

  // Initialize form data for all fields
  previewFormData.value = {}
  pages.value.forEach((page) => {
    page.fields.forEach((field) => {
      if (field.type === 'Multi-Select') {
        previewFormData.value[field.id] = []
      } else {
        previewFormData.value[field.id] = ''
      }
    })
  })

  console.log('Initialized previewFormData:', previewFormData.value)
  console.log('Setting showPreviewModal to true')
  showPreviewModal.value = true
  console.log('showPreviewModal.value is now:', showPreviewModal.value)
  console.log('currentPreviewPage computed:', currentPreviewPage.value)
}

const switchPreviewPage = (pageId: string) => {
  currentPreviewPageId.value = pageId
  // Reset form data when switching pages
  previewFormData.value = {}
}

const currentPreviewPage = computed(() => {
  return pages.value.find((page) => page.id === currentPreviewPageId.value)
})

const submitPreviewForm = () => {
  // Validate required fields
  const currentPage = currentPreviewPage.value
  if (!currentPage) return

  const errors: string[] = []

  currentPage.fields.forEach((field) => {
    if (field.required) {
      if (field.type === 'Multi-Select') {
        if (
          !previewFormData.value[field.id] ||
          previewFormData.value[field.id].length === 0
        ) {
          errors.push(`${field.name} is required`)
        }
      } else {
        if (
          !previewFormData.value[field.id] ||
          previewFormData.value[field.id].toString().trim() === ''
        ) {
          errors.push(`${field.name} is required`)
        }
      }
    }
  })

  if (errors.length > 0) {
    notyf.error(errors.join('. '))
    return
  }

  // Show success message
  notyf.success('Form submitted successfully!')
  console.log('Preview form data:', previewFormData.value)

  // Reset form
  previewFormData.value = {}
}

const closeModal = () => {
  console.log('closeModal called')
  showPreviewModal.value = false
  console.log('showPreviewModal set to false')
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-wrapper-inner is-single">
      <!--Fake navigation-->
      <div class="auth-nav">
        <div class="left" />
        <div class="center">
          <RouterLink to="/" class="header-item">
            <AnimatedLogo width="38px" height="38px" />
          </RouterLink>
        </div>
        <div class="right">
          <label
            class="ml-auto dark-mode"
            tabindex="0"
            role="button"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              data-cy="dark-mode-toggle"
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span />
          </label>
        </div>
      </div>

      <!--Single Centered Form-->
      <div class="page-content-inner">
        <form method="post" novalidate @submit.prevent="validateStep">
          <div class="mobile-steps is-active">
            <ul class="steps has-content-centered is-thin is-horizontal is-short">
              <li :class="[currentStep === 0 && 'is-active']" class="steps-segment">
                <span class="steps-marker" />
                <a
                  href="#"
                  class="steps-content"
                  @click.prevent="
                    currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -150 })
                  "
                >
                  <p class="step-number">Step 1</p>
                </a>
              </li>

              <li :class="[currentStep === 1 && 'is-active']" class="steps-segment">
                <span class="steps-marker" />
                <a
                  href="#"
                  class="steps-content"
                  @click.prevent="
                    currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -150 })
                  "
                >
                  <p class="step-number">Step 2</p>
                </a>
              </li>

              <li :class="[currentStep === 2 && 'is-active']" class="steps-segment">
                <span class="steps-marker" />
                <a
                  href="#"
                  class="steps-content"
                  @click.prevent="
                    currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -150 })
                  "
                >
                  <p class="step-number">Step 3</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="stepper-form">
            <div class="form-sections">
              <div
                v-if="currentStep >= 0"
                id="form-step-0"
                class="form-section is-active"
              >
                <h3 class="form-section-title">
                  <span>App Information</span>
                  <button
                    type="button"
                    class="help-button"
                    tabindex="0"
                    @keydown.space.prevent="
                      currentHelp === 0 ? (currentHelp = -1) : (currentHelp = 0)
                    "
                    @click="currentHelp === 0 ? (currentHelp = -1) : (currentHelp = 0)"
                  >
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:help-circle"
                    />
                  </button>
                </h3>

                <div class="form-section-inner">
                  <div class="fieldset">
                    <div class="column is-12">
                      <VField label="App Name *">
                        <VControl>
                          <VInput
                            v-model="appName"
                            type="text"
                            placeholder="Ex: A cool project"
                          />
                        </VControl>
                      </VField>
                    </div>
                    <div class="column is-12">
                      <VField label="Description">
                        <VControl fullwidth>
                          <VTextarea
                            v-model="appDescription"
                            class="textarea"
                            rows="4"
                            placeholder="Tell us about any details you'd like us to know..."
                            autocomplete="off"
                            autocapitalize="off"
                            spellcheck="true"
                          />
                        </VControl>
                      </VField>
                    </div>
                    <div class="column is-12">
                      <VField label="App Type *">
                        <VControl>
                          <VRadio
                            v-model="isB2C"
                            value="true"
                            label="B2C"
                            name="solid_squared_radio"
                            color="primary"
                            square
                            solid
                          />

                          <VRadio
                            v-model="isB2C"
                            value="false"
                            label="B2B"
                            name="solid_squared_radio"
                            color="primary"
                            square
                            solid
                          />
                        </VControl>
                      </VField>
                    </div>
                  </div>
                </div>
              </div>

              <Transition name="fade-slow">
                <div
                  v-if="currentStep >= 1"
                  id="form-step-1"
                  class="form-section is-active"
                >
                  <h3 class="form-section-title">
                    <span>Page Configuration</span>
                    <button
                      type="button"
                      class="help-button"
                      @keydown.space.prevent="
                        currentHelp === 1 ? (currentHelp = -1) : (currentHelp = 1)
                      "
                      @click="currentHelp === 1 ? (currentHelp = -1) : (currentHelp = 1)"
                    >
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:help-circle"
                      />
                    </button>
                  </h3>

                  <div class="form-section-inner">
                    <div class="fieldset">
                      <div class="column is-12">
                        <VField label="Page Name *">
                          <VControl>
                            <VInput
                              v-model="newPageName"
                              type="text"
                              placeholder="Enter page name"
                            />
                          </VControl>
                        </VField>
                      </div>

                      <div class="column is-12">
                        <VField label="Page Description">
                          <VControl fullwidth>
                            <VTextarea
                              v-model="newPageDescription"
                              class="textarea"
                              rows="3"
                              placeholder="Enter page description"
                            />
                          </VControl>
                        </VField>
                      </div>

                      <div class="column is-12">
                        <VButton
                          v-if="!editingPageId"
                          type="button"
                          color="primary"
                          bold
                          fullwidth
                          icon="feather:plus"
                          @click="handleAddPage"
                        >
                          Add Page
                        </VButton>

                        <div v-else class="edit-actions">
                          <div class="columns is-multiline">
                            <div class="column is-6">
                              <VButton
                                type="button"
                                color="success"
                                bold
                                fullwidth
                                icon="feather:check"
                                @click="handleUpdatePage"
                              >
                                Update Page
                              </VButton>
                            </div>

                            <div class="column is-6">
                              <VButton
                                type="button"
                                color="light"
                                fullwidth
                                icon="feather:x"
                                @click="cancelPageEdit"
                              >
                                Cancel
                              </VButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Page List -->
                  <div class="form-section-output">
                    <div v-for="page in pages" :key="page.id" class="output">
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:file-text"
                      />
                      <div class="field-info">
                        <div class="field-main">
                          <span class="field-name">{{ page.name }}</span>
                          <!-- <VTag
                            v-if="page.id === currentPageId"
                            color="success"
                            size="tiny"
                          >
                            Current
                          </VTag> -->
                        </div>
                        <span v-if="page.description" class="field-description">{{
                          page.description
                        }}</span>
                      </div>
                      <div class="actions">
                        <VIconButton
                          icon="feather:edit-2"
                          color="info"
                          @click="editPage(page)"
                        />
                        <VIconButton
                          icon="feather:trash-2"
                          color="danger"
                          @click="removePage(page.id)"
                        />
                      </div>
                    </div>
                    <div v-if="pages.length === 0" class="no-fields">
                      <i aria-hidden="true" class="iconify" data-icon="feather:info" />
                      <span>No pages added yet. Add your first page above.</span>
                    </div>
                  </div>
                </div>
              </Transition>

              <Transition name="fade-slow">
                <div
                  v-if="currentStep >= 2"
                  id="form-step-2"
                  class="form-section is-active"
                >
                  <h3 class="form-section-title">
                    <span>Form Items</span>
                    <button
                      type="button"
                      class="help-button"
                      @keydown.space.prevent="
                        currentHelp === 2 ? (currentHelp = -1) : (currentHelp = 2)
                      "
                      @click="currentHelp === 2 ? (currentHelp = -1) : (currentHelp = 2)"
                    >
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:help-circle"
                      />
                    </button>
                  </h3>

                  <!-- Page Selection UI - Only show when pages exist -->
                  <div v-if="pages.length > 0" class="page-selection">
                    <div class="page-selector">
                      <VField label="Current Page">
                        <VControl>
                          <Multiselect
                            v-model="currentPageId"
                            :options="
                              pages.map((page) => ({ value: page.id, label: page.name }))
                            "
                            placeholder="Select a page"
                            @update:model-value="switchPage"
                          />
                        </VControl>
                      </VField>
                    </div>

                    <div class="page-info">
                      <span class="page-count"
                        >{{ getCurrentPageFields().length }} fields</span
                      >
                    </div>
                  </div>

                  <div class="form-section-inner">
                    <div class="fieldset">
                      <div class="column is-12">
                        <VField label="Name">
                          <VControl fullwidth>
                            <VInput v-model="fieldName" type="text" placeholder="Name" />
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-12">
                        <VField label="Description">
                          <VControl fullwidth>
                            <VTextarea
                              v-model="fieldDescription"
                              class="textarea"
                              rows="4"
                              placeholder="Tell us about any details the filed information"
                              autocomplete="off"
                              autocapitalize="off"
                              spellcheck="true"
                            />
                          </VControl>
                        </VField>
                      </div>

                      <!-- Required Field Checkbox -->
                      <div class="">
                        <VField>
                          <VControl>
                            <VCheckbox
                              v-model="fieldRequired"
                              label="This field is required"
                              color="primary"
                            />
                          </VControl>
                        </VField>
                      </div>

                      <div class="column is-12">
                        <VField v-slot="{ id }" label="Type">
                          <VControl fullwidth>
                            <Multiselect
                              v-model="type"
                              :attrs="{ id }"
                              placeholder="Pick a field type"
                              :options="[
                                'Text',
                                'Textarea',
                                'Number',
                                'Date',
                                'Radio',
                                'Multi-Select',
                              ]"
                            />
                          </VControl>
                        </VField>
                      </div>

                      <!-- Options input fields for Radio and Multi-Select -->
                      <div
                        v-if="type === 'Radio' || type === 'Multi-Select'"
                        class="column is-12"
                      >
                        <VField label="Options">
                          <VControl fullwidth>
                            <div
                              v-for="(option, index) in options"
                              :key="index"
                              class="option-input-row"
                            >
                              <VInput
                                v-model="options[index]"
                                type="text"
                                :placeholder="`Option ${index + 1}`"
                              />
                              <VIconButton
                                v-if="options.length > 1"
                                icon="feather:trash-2"
                                color="danger"
                                @click="removeOption(index)"
                              />
                            </div>

                            <!-- Add Option Button moved below the options -->
                            <div class="add-option-section">
                              <VButton
                                type="button"
                                color="light"
                                size="medium"
                                @click="addOption"
                              >
                                <i
                                  aria-hidden="true"
                                  class="iconify"
                                  data-icon="feather:plus"
                                />
                                Add Option
                              </VButton>
                            </div>
                          </VControl>
                        </VField>
                      </div>

                      <!-- Add Field Button -->
                      <div class="column is-12">
                        <div class="field-actions">
                          <VButton
                            v-if="!isEditMode"
                            type="button"
                            color="primary"
                            bold
                            fullwidth
                            icon="feather:plus"
                            :disabled="isLoading || isValidationInProgress || isExecuting"
                            @click="handleAddField"
                          >
                            {{
                              isLoading || isValidationInProgress || isExecuting
                                ? 'Adding...'
                                : 'Add Field'
                            }}
                          </VButton>

                          <div v-else>
                            <div class="columns is-multiline">
                              <div class="column is-6">
                                <VButton
                                  type="button"
                                  color="success"
                                  bold
                                  fullwidth
                                  icon="feather:check"
                                  :disabled="
                                    isLoading || isValidationInProgress || isExecuting
                                  "
                                  @click="handleUpdateField"
                                >
                                  {{
                                    isLoading || isValidationInProgress || isExecuting
                                      ? 'Updating...'
                                      : 'Update Field'
                                  }}
                                </VButton>
                              </div>

                              <div class="column is-6">
                                <VButton
                                  type="button"
                                  color="light"
                                  fullwidth
                                  icon="feather:x"
                                  @click="cancelEdit"
                                >
                                  Cancel
                                </VButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="columns column">
                        <ClientOnly>
                          <div class="column is-6">
                            <VDatePicker
                              v-model="date"
                              is-range
                              color="green"
                              trim-weeks
                            >
                              <template #default="{ inputValue, inputEvents }">
                                <div class="columns v-calendar-combo">
                                  <div class="column is-12">
                                    <VField>
                                      <VLabel>Meeting start date</VLabel>

                                      <VControl icon="feather:calendar">
                                        <input
                                          type="text"
                                          placeholder="Start Date"
                                          :value="inputValue.start"
                                          class="input form-datepicker"
                                          v-on="inputEvents.start"
                                        >
                                      </VControl>
                                    </VField>
                                  </div>
                                </div>
                              </template>
                            </VDatePicker>
                          </div>
                          
                          <div class="column is-6">
                            <VDatePicker
                              v-model="date.start"
                              color="green"
                              mode="time"
                              is24hr
                            >
                              <template #default="{ inputValue, inputEvents }">
                                <VField>
                                  <VLabel>Meeting start time</VLabel>
                                  <VControl>
                                    <input
                                      type="text"
                                      class="input form-timepicker"
                                      :value="inputValue"
                                      v-on="inputEvents"
                                    >
                                  </VControl>
                                </VField>
                              </template>
                            </VDatePicker>
                          </div>
                        </ClientOnly>
                      </div> -->
                    </div>
                  </div>

                  <div class="form-section-output">
                    <div
                      v-for="field in getCurrentPageFields()"
                      :key="field.id"
                      class="output"
                    >
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:file-text"
                      />
                      <div class="field-info">
                        <div class="field-main">
                          <span class="field-name">{{ field.name }}</span>
                          <VTag :color="getTypeColor(field.type)">
                            {{ field.type }}
                          </VTag>
                          <VTag v-if="field.required" color="danger"> Required </VTag>
                        </div>
                      </div>
                      <div class="actions">
                        <VIconButton
                          icon="feather:edit-2"
                          color="info"
                          @click="editField(field)"
                        />
                        <VIconButton
                          icon="feather:trash-2"
                          color="danger"
                          @click="removeField(field.id)"
                        />
                      </div>
                    </div>
                    <div v-if="getCurrentPageFields().length === 0" class="no-fields">
                      <i aria-hidden="true" class="iconify" data-icon="feather:info" />
                      <span>No fields added yet. Add your first field above.</span>
                    </div>

                    <!-- Preview Button -->
                    <div
                      v-if="pages.length > 0 && getCurrentPageFields().length > 0"
                      class="preview-section"
                    >
                      <VButton
                        type="button"
                        color="info"
                        bold
                        fullwidth
                        icon="feather:eye"
                        @click="openPreviewModal"
                      >
                        Preview App
                      </VButton>
                    </div>
                  </div>
                </div>
              </Transition>

              <Transition name="fade-slow">
                <div
                  v-if="currentStep >= 3"
                  id="form-step-3"
                  class="form-section is-active"
                >
                  <h3 class="form-section-title">
                    <span>Domain Name</span>
                    <button
                      type="button"
                      class="help-button"
                      @keydown.space.prevent="
                        currentHelp === 3 ? (currentHelp = -1) : (currentHelp = 3)
                      "
                      @click="currentHelp === 3 ? (currentHelp = -1) : (currentHelp = 3)"
                    >
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:help-circle"
                      />
                    </button>
                  </h3>

                  <div class="form-section-inner">
                    <VField>
                      <VControl>
                        <VInput type="text" placeholder="Your Domain Name" />
                      </VControl>
                    </VField>
                  </div>
                </div>
              </Transition>

              <div class="navigation-buttons">
                <div class="buttons is-right">
                  <VButton
                    type="submit"
                    color="primary"
                    bold
                    :loading="isLoading"
                    tabindex="0"
                  >
                    Continue
                  </VButton>
                </div>
              </div>
            </div>

            <div class="form-stepper">
              <ul v-if="currentHelp === -1" class="steps is-vertical is-thin is-short">
                <li
                  id="step-segment-0"
                  role="button"
                  :class="[currentStep === 0 && 'is-active']"
                  class="steps-segment"
                  tabindex="0"
                  @keydown.space.prevent="
                    currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -20 })
                  "
                  @click.prevent="
                    currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -20 })
                  "
                >
                  <a href="#" class="steps-marker" />
                  <div class="steps-content">
                    <p class="step-number">STEP 1</p>
                    <p class="step-info">App Information</p>
                  </div>
                </li>
                <li
                  id="step-segment-1"
                  :class="[currentStep === 1 && 'is-active']"
                  class="steps-segment"
                  tabindex="0"
                  role="button"
                  @keydown.space.prevent="
                    currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -20 })
                  "
                  @click.prevent="
                    currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -20 })
                  "
                >
                  <a href="#" class="steps-marker" />
                  <div class="steps-content">
                    <p class="step-number">STEP 2</p>
                    <p class="step-info">Page Configuration</p>
                  </div>
                </li>
                <li
                  id="step-segment-2"
                  :class="[currentStep === 2 && 'is-active']"
                  class="steps-segment"
                  tabindex="0"
                  role="button"
                  @keydown.space.prevent="
                    currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -20 })
                  "
                  @click.prevent="
                    currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -20 })
                  "
                >
                  <a href="#" class="steps-marker" />
                  <div class="steps-content">
                    <p class="step-number">STEP 3</p>
                    <p class="step-info">Form Items</p>
                  </div>
                </li>
                <li
                  id="step-segment-3"
                  :class="[currentStep === 3 && 'is-active']"
                  class="steps-segment"
                  tabindex="0"
                  role="button"
                  @keydown.space.prevent="
                    currentStep >= 3 && scrollTo('#form-step-3', 800, { offset: -20 })
                  "
                  @click.prevent="
                    currentStep >= 3 && scrollTo('#form-step-3', 800, { offset: -20 })
                  "
                >
                  <a href="#" class="steps-marker" />
                  <div class="steps-content">
                    <p class="step-number">STEP 4</p>
                    <p class="step-info">Domain Name</p>
                  </div>
                </li>
                <!--<li
                  id="step-segment-4"
                  :class="[currentStep === 4 && 'is-active']"
                  class="steps-segment"
                  tabindex="0"
                  role="button"
                  @keydown.space.prevent="
                    currentStep >= 4 && scrollTo('#form-step-4', 800, { offset: -20 })
                  "
                  @click.prevent="
                    currentStep >= 4 && scrollTo('#form-step-4', 800, { offset: -20 })
                  "
                >
                  <a
                    href="#"
                    class="steps-marker"
                  />
                  <div class="steps-content">
                    <p class="step-number">
                      STEP 5
                    </p>
                    <p class="step-info">
                      Validation
                    </p>
                  </div>
                </li> -->
              </ul>

              <!-- iPhone Preview -->
              <div v-if="currentStep >= 2 && pages.length > 0" class="iphone-preview">
                <div class="iphone-frame">
                  <div class="iphone-notch" />
                  <div class="iphone-screen">
                    <div class="preview-header">
                      <h3>{{ getCurrentPage()?.name || 'Page Name' }}</h3>
                      <p>{{ getCurrentPage()?.description || 'Page Description' }}</p>
                    </div>

                    <div class="preview-content">
                      <div
                        v-for="field in getCurrentPageFields()"
                        :key="field.id"
                        class="preview-field"
                      >
                        <div class="field-label">
                          {{ field.name }}
                          <span v-if="field.required" class="required">*</span>
                        </div>

                        <div class="field-value">
                          <!-- Text/Textarea -->
                          <div
                            v-if="field.type === 'Text' || field.type === 'Textarea'"
                            class="text-preview"
                          >
                            {{ field.description || 'Sample text content' }}
                          </div>

                          <!-- Number -->
                          <div v-else-if="field.type === 'Number'" class="number-preview">
                            123
                          </div>

                          <!-- Date -->
                          <div v-else-if="field.type === 'Date'" class="date-preview">
                            {{ new Date().toISOString().split('T')[0] }}
                          </div>

                          <!-- Radio -->
                          <div v-else-if="field.type === 'Radio'" class="radio-preview">
                            <div
                              v-for="(option, index) in field.options"
                              :key="index"
                              class="radio-option"
                            >
                              <div
                                class="radio-dot"
                                :class="{ 'is-selected': index === 0 }"
                              />
                              <span>{{ option }}</span>
                            </div>
                          </div>

                          <!-- Multi-Select -->
                          <div
                            v-else-if="field.type === 'Multi-Select'"
                            class="multiselect-preview"
                          >
                            <div
                              v-for="(option, index) in field.options"
                              :key="index"
                              class="checkbox-option"
                            >
                              <div
                                class="checkbox-square"
                                :class="{ 'is-selected': index === 0 }"
                              />
                              <span>{{ option }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="getCurrentPageFields().length === 0"
                        class="no-fields-preview"
                      >
                        <i class="iconify" data-icon="feather:plus-circle" />
                        <span>Add fields to see preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="currentStep >= 2" class="form-help">
                <div
                  v-if="currentHelp === 0"
                  id="help-section-0"
                  class="form-help-inner is-active"
                >
                  <button
                    class="close-help-button"
                    tabindex="0"
                    @keydown.space.prevent="currentHelp = -1"
                    @click="currentHelp = -1"
                  >
                    <i aria-hidden="true" class="iconify" data-icon="feather:x" />
                  </button>
                  <h3>App Information</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod
                    proximum fuit non vidit. Quantum Aristoxeni ingenium consumptum
                    videmus in musicis? An eiusdem modi? Quae similitudo in genere etiam
                    humano apparet.
                  </p>
                  <div class="list-wrap">
                    <ul>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="currentHelp === 1"
                  id="help-section-1"
                  class="form-help-inner is-active"
                >
                  <button
                    class="close-help-button"
                    tabindex="0"
                    @keydown.space.prevent="currentHelp = -1"
                    @click="currentHelp = -1"
                  >
                    <i aria-hidden="true" class="iconify" data-icon="feather:x" />
                  </button>
                  <h3>Shipment Owner</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod
                    proximum fuit non vidit. Quantum Aristoxeni ingenium consumptum
                    videmus in musicis? An eiusdem modi? Quae similitudo in genere.
                  </p>
                  <div class="list-wrap">
                    <ul>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="currentHelp === 2"
                  id="help-section-2"
                  class="form-help-inner is-active"
                >
                  <button
                    class="close-help-button"
                    tabindex="0"
                    @keydown.space.prevent="currentHelp = -1"
                    @click="currentHelp = -1"
                  >
                    <i aria-hidden="true" class="iconify" data-icon="feather:x" />
                  </button>
                  <h3>Domain Name</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod
                    proximum fuit non vidit. Quantum Aristoxeni ingenium consumptum
                    videmus in musicis? An eiusdem modi? Quae similitudo in genere etiam
                    humano apparet.
                  </p>
                  <div class="list-wrap">
                    <ul>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="currentHelp === 3"
                  id="help-section-3"
                  class="form-help-inner is-active"
                >
                  <button
                    class="close-help-button"
                    tabindex="0"
                    @keydown.space.prevent="currentHelp = -1"
                    @click="currentHelp = -1"
                  >
                    <i aria-hidden="true" class="iconify" data-icon="feather:x" />
                  </button>
                  <h3>Options</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod
                    proximum fuit non vidit. Quantum Aristoxeni ingenium consumptum
                    videmus in musicis? An eiusdem modi? Quae similitudo in genere.
                  </p>
                  <div class="list-wrap">
                    <ul>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="currentHelp === 4"
                  id="help-section-4"
                  class="form-help-inner is-active"
                >
                  <button
                    class="close-help-button"
                    tabindex="0"
                    @keydown.space.prevent="currentHelp = -1"
                    @click="currentHelp = -1"
                  >
                    <i aria-hidden="true" class="iconify" data-icon="feather:x" />
                  </button>
                  <h3>Validation</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod
                    proximum fuit non vidit. Quantum Aristoxeni ingenium consumptum
                    videmus in musicis? An eiusdem modi? Quae similitudo in genere.
                  </p>
                  <div class="list-wrap">
                    <ul>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                      <li>
                        <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                        <span>Some nice list item</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="showPreviewModal"
      class="native-modal-overlay"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      @click="closeModal"
      @keydown.esc="closeModal"
    >
      <div class="native-modal preview-modal" @click.stop>
        <div class="native-modal-header">
          <h3>Preview App</h3>
          <button
            type="button"
            class="close-button"
            aria-label="Close modal"
            @click="closeModal"
          >
            ×
          </button>
        </div>

        <div class="preview-modal-content">
          <!-- Page Navigation Tabs -->
          <div v-if="pages.length > 1" class="preview-tabs">
            <div class="tabs is-boxed">
              <ul>
                <li
                  v-for="page in pages"
                  :key="page.id"
                  :class="{ 'is-active': currentPreviewPageId === page.id }"
                >
                  <button
                    type="button"
                    class="tab-button"
                    @click="switchPreviewPage(page.id)"
                  >
                    {{ page.name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Page Content -->
          <div v-if="currentPreviewPage" class="preview-content">
            <div class="page-header">
              <h2 class="page-title">
                {{ currentPreviewPage.name }}
              </h2>
              <p v-if="currentPreviewPage.description" class="page-description">
                {{ currentPreviewPage.description }}
              </p>
            </div>

            <!-- Form Fields -->
            <form
              v-if="currentPreviewPage.fields && currentPreviewPage.fields.length > 0"
              class="preview-form"
              @submit.prevent="submitPreviewForm"
            >
              <div
                v-for="field in currentPreviewPage.fields"
                :key="field.id"
                class="form-field"
              >
                <VField :label="field.name + (field.required ? ' *' : '')">
                  <!-- Field Description -->
                  <p v-if="field.description" class="field-description">
                    {{ field.description }}
                  </p>

                  <VControl fullwidth>
                    <!-- Text Input -->
                    <VInput
                      v-if="field.type === 'Text'"
                      v-model="previewFormData[field.id]"
                      type="text"
                      :placeholder="
                        field.description || `Enter ${field.name.toLowerCase()}`
                      "
                      :required="field.required"
                    />

                    <!-- Textarea -->
                    <VTextarea
                      v-else-if="field.type === 'Textarea'"
                      v-model="previewFormData[field.id]"
                      type="text"
                      :placeholder="
                        field.description || `Enter ${field.name.toLowerCase()}`
                      "
                      :required="field.required"
                      rows="4"
                    />

                    <!-- Number Input -->
                    <VInput
                      v-else-if="field.type === 'Number'"
                      v-model="previewFormData[field.id]"
                      type="number"
                      :placeholder="
                        field.description || `Enter ${field.name.toLowerCase()}`
                      "
                      :required="field.required"
                    />

                    <!-- Date Input -->
                    <VInput
                      v-else-if="field.type === 'Date'"
                      v-model="previewFormData[field.id]"
                      type="date"
                      :required="field.required"
                    />

                    <!-- Radio Buttons -->
                    <div v-else-if="field.type === 'Radio'" class="radio-group">
                      <VRadio
                        v-for="(option, index) in field.options"
                        :key="index"
                        v-model="previewFormData[field.id]"
                        :value="option"
                        :label="option"
                        name="radio-group"
                        color="primary"
                        square
                        solid
                      />
                    </div>

                    <!-- Multi-Select -->
                    <div
                      v-else-if="field.type === 'Multi-Select'"
                      class="multiselect-group"
                    >
                      <VCheckbox
                        v-for="(option, index) in field.options"
                        :key="index"
                        v-model="previewFormData[field.id]"
                        :value="option"
                        :label="option"
                        color="primary"
                      />
                    </div>
                  </VControl>
                </VField>
              </div>

              <div class="form-actions">
                <VButton type="submit" color="primary" bold fullwidth> Submit </VButton>
              </div>
            </form>

            <!-- No Fields Message -->
            <div v-else class="no-fields">
              <i aria-hidden="true" class="iconify" data-icon="feather:info" />
              <span>No fields configured for this page.</span>
            </div>
          </div>

          <!-- No Pages Message -->
          <div v-else-if="pages.length === 0" class="no-pages">
            <i aria-hidden="true" class="iconify" data-icon="feather:info" />
            <span>No pages found. Please complete the builder configuration first.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
  max-width: 740px;
  margin: 0 auto;
}
.auth-wrapper-inner {
  overflow: visible !important;
  height: 100%;
  padding: 0;
  margin: 0;

  &.is-gapless:not(:last-child) {
    margin-bottom: 0 !important;
  }

  &.is-single {
    background: var(--widget-grey);
    min-height: 100vh;
  }

  .hero-banner {
    background: var(--widget-grey);

    img {
      max-width: 550px;
      margin: 0 auto;
    }
  }

  .hero-heading {
    position: relative;
    max-width: 360px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0 0;

    .auth-logo {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dark-mode {
        transform: scale(0.6);
        z-index: 2;
        margin-inline-start: 0 !important;
      }

      svg {
        height: 42px;
        width: 42px;
      }

      .top-logo {
        height: 42px;
      }
    }
  }

  .hero {
    &.is-white {
      background: var(--white);
    }

    .hero-body {
      .login {
        padding: 10px 0;
      }

      .auth-content {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        margin-top: -40px;
        margin-bottom: 40px;

        h2 {
          font-size: 2rem;
          font-family: var(--font);
          line-height: 1;
        }

        p {
          font-size: 1rem;
          margin-bottom: 8px;
          color: var(--muted-grey);
        }

        a {
          font-size: 0.9rem;
          font-family: var(--font-alt);
          font-weight: 500;
          color: var(--primary);
        }
      }

      .auth-form-wrapper {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
      }
    }
  }

  .forgot-link {
    margin-top: 10px;

    a {
      font-family: var(--font-alt);
      font-size: 0.9rem;
      color: var(--light-text);
      transition: color 0.3s;

      &:hover,
      &:focus {
        color: var(--primary);
      }
    }
  }

  .setting-item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .setting-meta {
      font-family: var(--font);
      color: var(--light-text);
      margin-inline-start: 8px;
    }
  }

  .v-button {
    min-height: 44px;
  }
}

.is-dark {
  .auth-wrapper-inner {
    .hero-banner {
      background: var(--dark-sidebar-light-4);
    }

    .hero {
      &.is-white {
        background: var(--dark-sidebar-dark-4);
      }

      .hero-body {
        .auth-content {
          h2 {
            color: var(--dark-dark-text);
          }

          a {
            color: var(--primary);
          }
        }
      }
    }

    .forgot-link {
      a:hover {
        color: var(--primary);
      }
    }
  }
}

.auth-nav {
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .left,
  .right {
    display: flex;
    align-items: center;
    width: 20%;
  }

  .right {
    justify-content: flex-end;

    .dark-mode {
      transform: scale(0.7);
    }
  }

  .center {
    flex-grow: 2;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: block;
        width: 100%;
        max-width: 80px;
      }
    }
  }
}

.auth-wrapper-inner {
  .single-form-wrap {
    min-height: 690px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-wrap {
      width: 100%;
      margin: 6rem auto 0;

      .auth-head {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        margin-top: 6rem;
        margin-bottom: 2rem;
        text-align: center;

        h2 {
          font-size: 2rem;
          font-family: var(--font);
          line-height: 1;
        }

        p {
          font-size: 1rem;
          margin-bottom: 8px;
          color: var(--muted-grey);
        }

        a {
          font-size: 0.9rem;
          font-family: var(--font-alt);
          font-weight: 500;
          color: var(--primary);
        }
      }

      .form-card {
        margin-bottom: 6rem;

        .v-button {
          margin-top: 10px;
        }
      }
    }
  }
}

.is-dark {
  .auth-wrapper-inner {
    &.is-single {
      background: var(--dark-sidebar-light-4);

      .single-form-wrap {
        .inner-wrap {
          .auth-head {
            h2 {
              color: var(--dark-dark-text);
            }

            a {
              color: var(--primary);
            }
          }

          .form-card {
            background: var(--dark-sidebar-dark-4);
            border-color: var(--dark-sidebar-light-1);
          }
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .avatar-carousel {
    &.resized-mobile {
      max-width: 300px;
    }

    .slick-custom {
      display: none !important;
    }

    .image-wrapper img {
      height: auto;
    }
  }

  .auth-wrapper-inner {
    .hero {
      .hero-body {
        .auth-content {
          text-align: center !important;
        }
      }
    }

    .single-form-wrap {
      .inner-wrap {
        .form-card {
          padding: 40px;
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .modern-login {
    .top-logo {
      svg {
        height: 60px;
        width: 60px;
      }
    }

    .dark-mode {
      top: -58px;
      inset-inline-end: 30%;
    }

    .columns {
      display: flex;
      height: 100vh;
    }
  }

  .auth-wrapper-inner {
    .hero {
      .hero-body {
        .auth-content {
          text-align: center !important;
        }
      }
    }
  }

  .signup-columns {
    max-width: 460px;
    margin: 0 auto;
  }
}

.card-grid {
  .columns {
    margin-inline-start: -0.5rem !important;
    margin-inline-end: -0.5rem !important;
    margin-top: -0.5rem !important;
  }

  .column {
    padding: 0.5rem !important;

    &.app {
      cursor: pointer;
    }
  }
}

.card-grid-v3 {
  .card-grid-item {
    @include vuero-s-card;

    position: relative;
    text-align: center;
    padding: 30px;

    .h-toggle {
      position: absolute;
      top: 28px;
      inset-inline-end: 10px;
      transform: scale(0.85);
    }

    > .v-avatar {
      display: block;
      margin: 0 auto 10px;
      border-radius: 16px;

      .avatar {
        object-fit: cover;
        border: 1px solid var(--fade-grey-dark-4);
        box-shadow: var(--light-box-shadow);
      }

      .badge {
        bottom: 22px;
        inset-inline-end: -12px;
      }
    }

    > h3 {
      font-size: 1.1rem;
      font-weight: 600;
      font-family: var(--font-alt);
      color: var(--dark-text);
    }

    > p {
      font-size: 0.9rem;
    }

    .description {
      padding: 12px 0;
    }

    .people {
      display: flex;
      justify-content: center;
      padding: 8px 0 30px;

      .v-avatar {
        margin: 0 4px;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;

      .button {
        width: calc(50% - 4px);
        color: var(--light-text);

        &:hover,
        &:focus {
          border-color: var(--fade-grey-dark-4);
          color: var(--primary);
          box-shadow: var(--light-box-shadow);
        }
      }
    }
  }
}

.is-dark {
  .card-grid-v3 {
    .card-grid-item {
      @include vuero-card--dark;
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
  .card-grid-v3 .card-grid-item > h3 {
    font-size: 1rem;
  }
}
.page-content-inner {
  padding: 6rem 4rem;
}
.stepper-form {
  display: flex;
  padding-top: 3rem;
  max-width: 880px;
  margin: 0 auto;

  .page-selection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--widget-grey-dark-3);
    border: 1px solid var(--border);
    border-radius: 0.5rem;

    .page-selector {
      flex: 1;
      margin-right: 1rem;
    }

    .page-info {
      flex-shrink: 0;
      font-size: 0.9rem;
      color: var(--light-text);
    }
  }

  .form-sections {
    flex-grow: 2;
    max-width: 640px;
    padding-inline-end: 4rem;

    .form-section {
      display: none;

      &.is-active {
        display: block;
      }

      + .form-section {
        margin-top: 4rem;
      }

      .form-section-title {
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 1rem;

        button {
          position: relative;
          top: 4px;
          padding: 0;
          height: 18px;
          width: 18px;
          border: none;
          background: none;
          cursor: pointer;
          margin-inline-start: 0.25rem;

          svg {
            height: 18px;
            width: 18px;
            pointer-events: none;
          }
        }
      }

      .fieldset {
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border);
        background: var(--widget-grey-dark-3);

        .fieldset-separator {
          margin: 1.5rem 0;
          border-top: 1px solid var(--border);
        }
      }

      .field {
        > label {
          margin-bottom: 0.25rem;
          display: inline-block;
        }

        > .buttons {
          padding: 2rem 0;
        }
      }

      .flex-label {
        display: flex;
        align-items: center;
        height: 100%;

        h4 {
          font-family: var(--font);
          font-weight: 500;
          color: var(--dark-text);
        }
      }

      .subcontrol {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 175px;
        padding-inline-end: 1rem;

        .checkbox {
          padding: 0;
        }
      }

      .input-button {
        height: 44px;
        width: 100%;
        border: 2px dashed var(--border);
        border-radius: 0.65rem;
        background: var(--widget-grey-dark-3);
        display: flex;
        align-items: center;
        padding-inline-start: calc(0.75em - 1px);
        padding-inline-end: calc(0.75em - 1px);
        padding-top: 0;
        padding-bottom: 0;
        color: var(--dark-text);
        cursor: pointer;
        transition:
          color 0.3s,
          background-color 0.3s,
          border 0.3s,
          box-shadow 0.3s;

        &:focus-visible {
          outline-offset: var(--accessibility-focus-outline-offset);
          outline-width: var(--accessibility-focus-outline-width);
          outline-style: var(--accessibility-focus-outline-style);
          outline-color: var(--accessibility-focus-outline-color);
        }

        &:hover {
          background: var(--white);
          border: 2px solid var(--primary);
          color: var(--primary);
          box-shadow: var(--light-box-shadow);
        }

        svg {
          height: 18px;
          width: 16px;
        }

        span {
          font-family: var(--font);
          margin-inline-start: 0.75rem;
        }
      }

      .options {
        display: flex;
        flex-wrap: wrap;
        margin-inline-start: -0.5rem;
        margin-inline-end: -0.5rem;

        .option {
          position: relative;
          width: calc(33.3% - 1rem);
          margin: 0.5rem;

          &:focus-within {
            border-radius: 4px;
            outline-offset: var(--accessibility-focus-outline-offset);
            outline-width: var(--accessibility-focus-outline-width);
            outline-style: var(--accessibility-focus-outline-style);
            outline-color: var(--accessibility-focus-outline-color);
          }

          input {
            position: absolute;
            top: 0;
            inset-inline-start: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            opacity: 0;
            cursor: pointer;

            &:checked {
              ~ .indicator {
                transform: scale(1);
              }

              ~ .option-inner {
                border-color: var(--primary);
                box-shadow: var(--light-box-shadow);

                i {
                  color: var(--primary);
                }
              }
            }
          }

          .indicator {
            position: absolute;
            top: 1rem;
            inset-inline-end: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;
            width: 20px;
            color: var(--white);
            background: var(--primary);
            border-radius: 50%;
            transform: scale(0);
            transition: transform 0.3s;

            svg {
              height: 14px;
              width: 14px;
              stroke-width: 3px;
            }
          }

          .option-inner {
            padding: 1.5rem;
            background: var(--white);
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            transition:
              border 0.3s,
              box-shadow 0.3s;

            h4 {
              color: var(--dark-text);
              font-weight: 600;
              font-family: var(--font-alt);
            }

            p {
              font-size: 0.9rem;
            }

            i {
              font-size: 2.25rem;
              color: var(--light-text);
              margin-bottom: 0.25rem;
            }
          }
        }
      }

      .validation-box {
        display: flex;
        padding: 2rem;
        background: var(--white);
        border: 1px solid var(--border);
        border-radius: 0.5rem;
        transition:
          border 0.3s,
          box-shadow 0.3s;

        .box-content {
          h3 {
            font-family: var(--font-alt);
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          p {
            font-size: 1rem;
          }
        }

        .box-illustration {
          position: relative;
          height: 100px;
          min-width: 40%;

          img {
            position: absolute;
            inset-inline-end: 0;
            bottom: 0;
            max-height: 180px;
          }
        }
      }

      .form-section-output {
        margin-top: 1.5rem;

        .output {
          height: 64px;
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 0.65rem;
          background: var(--white);
          display: flex;
          align-items: center;
          padding-inline-start: calc(1em - 1px);
          padding-inline-end: calc(1em - 1px);
          padding-top: 0;
          padding-bottom: 0;
          color: var(--dark-text);
          cursor: pointer;
          transition:
            color 0.3s,
            background-color 0.3s,
            border 0.3s,
            box-shadow 0.3s;

          &:not(:last-child) {
            margin-bottom: 1rem;
          }

          > svg {
            height: 18px;
            width: 18px;
            margin-inline-end: 0.75rem;
            color: var(--light-text);
          }

          > span {
            font-weight: 500;
            font-family: var(--font);
            color: var(--dark-text);
          }

          .action {
            margin-inline-start: auto;

            button {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 38px;
              width: 38px;
              min-width: 38px;
              background: none;
              border: none;
              padding: 0;
              cursor: pointer;
              border-radius: 0.5rem;
              transition: background-color 0.3s;

              &:hover,
              &:focus {
                background: var(--widget-grey-dark-1);
              }

              svg {
                height: 18px;
                width: 18px;
                stroke-width: 1.5px;
              }
            }
          }
        }
      }
    }

    .navigation-buttons {
      padding: 2rem 0;

      .button {
        min-height: 52px;
        min-width: 160px;
      }
    }
  }

  .form-stepper {
    position: sticky;
    top: -30px;
    padding-top: 50px;
    align-self: flex-start;
    height: fit-content;
    width: 240px;
    flex-shrink: 0;

    .form-help {
      position: relative;
      max-width: 300px;
      padding: 1.75rem;
      border: 1px solid var(--border);
      border-radius: 0.65rem;
      background: var(--white);

      .form-help-inner {
        display: none;

        &.is-active {
          display: block;
        }
      }

      h3 {
        font-family: var(--font-alt);
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      button {
        position: absolute;
        top: 1rem;
        inset-inline-end: 1rem;
        padding: 0;
        height: 18px;
        width: 18px;
        border: none;
        background: none;
        cursor: pointer;
        margin-inline-start: 0.25rem;

        svg {
          height: 18px;
          width: 18px;
          pointer-events: none;
        }
      }

      .list-wrap {
        padding: 0.75rem 0;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 0.15rem;

          span {
            font-family: var(--font);
            color: var(--light-text);
            font-weight: 300;
          }

          svg {
            height: 14px;
            width: 14px;
            stroke-width: 3px;
            margin-inline-end: 0.45rem;
            color: var(--primary);
          }
        }
      }
    }

    .step-number {
      font-family: var(--font);
      font-weight: 500;
      font-size: 0.75rem !important;
    }

    .steps:not(.is-hollow) .steps-segment.is-active ~ .steps-segment {
      cursor: default !important;
    }

    .steps:not(.is-hollow) .steps-segment {
      cursor: pointer !important;
    }

    .steps-segment {
      &.is-active {
        .step-info {
          color: var(--dark-text);
          font-weight: 600;
        }
      }
    }

    .iphone-preview {
      margin-top: 2rem;
      background: var(--white);
      border-radius: 1rem;

      .iphone-frame {
        // width: 200px;
        height: 500px;
        background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
        border-radius: 28px;
        padding: 4px;
        margin: 0 auto;
        position: relative;
        box-shadow:
          0 0 0 2px #000,
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          right: -2px;
          transform: translateY(-50%);
          width: 3px;
          height: 60px;
          background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
          border-radius: 2px;
          box-shadow:
            0 0 0 1px #000,
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -2px;
          transform: translateY(-50%);
          width: 3px;
          height: 60px;
          background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
          border-radius: 2px;
          box-shadow:
            0 0 0 1px #000,
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .iphone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 18px;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 0 0 10px 10px;
          z-index: 2;
          box-shadow:
            0 0 0 2px #000,
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          background: var(--white);
          border-radius: 25px;
          overflow: hidden;
          padding: 35px 4px 15px 4px;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
          position: relative;
          display: flex;
          flex-direction: column;

          &::after {
            content: '';
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: #000;
            border-radius: 2px;
            opacity: 0.3;
          }

          .preview-header {
            text-align: left;
            margin-bottom: 1.5rem;
            flex-shrink: 0;
            margin-left: 4px;
            margin-right: 4px;

            h3 {
              font-size: 1.2rem;
              font-weight: 600;
              color: var(--dark-text);
              margin: 0 0 0.5rem 0;
            }

            p {
              font-size: 0.9rem;
              color: var(--light-text);
              margin: 0;
            }
          }

          .preview-content {
            flex: 1;
            width: 100%;
            overflow-y: auto;
            padding-right: 4px;
            padding-left: 4px;

            /* Webkit 스크롤바 스타일링 */
            &::-webkit-scrollbar {
              width: 4px;
            }

            &::-webkit-scrollbar-track {
              background: transparent;
            }

            &::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.2);
              border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.3);
            }

            .preview-field {
              margin-bottom: 1rem;
              padding: 0.75rem;
              background: var(--widget-grey);
              border-radius: 0.5rem;

              .field-label {
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--dark-text);
                margin-bottom: 0.5rem;
                text-align: left;

                .required {
                  color: var(--danger);
                  margin-left: 0.25rem;
                }
              }

              .field-value {
                .text-preview,
                .number-preview,
                .date-preview {
                  font-size: 0.8rem;
                  color: var(--light-text);
                  font-style: italic;
                  padding: 0.25rem 0;
                }

                .radio-preview,
                .multiselect-preview {
                  .radio-option,
                  .checkbox-option {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5rem;

                    .radio-dot,
                    .checkbox-square {
                      position: relative;
                      top: -1px;
                      background: var(--white);
                      content: '';
                      display: inline-block;
                      margin-inline-end: 0.5rem;
                      padding: 0;
                      vertical-align: middle;
                      width: 1.4em;
                      height: 1.4em;
                      border: 1px solid var(--fade-grey-dark-8);
                      transform: translate3d(0, 0, 0);
                      backface-visibility: hidden;
                      transition: all 0.3s;
                      flex-shrink: 0;

                      &.is-selected {
                        border-color: var(--primary);
                        background: var(--primary);
                      }
                    }

                    .radio-dot {
                      border-radius: 100%;

                      &.is-selected::after {
                        background-size: contain;
                        position: absolute;
                        top: 49%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(1);
                        content: '\f111';
                        font-family: 'Font Awesome\ 5 Free';
                        font-weight: 900;
                        font-size: 0.6rem;
                        color: var(--white);
                      }
                    }

                    .checkbox-square {
                      border-radius: var(--radius-small);

                      &.is-selected::after {
                        background-size: contain;
                        position: absolute;
                        top: 48%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(1);
                        content: '\f00c';
                        font-family: 'Font Awesome\ 5 Free';
                        font-weight: 900;
                        font-size: 0.7rem;
                        color: var(--white);
                      }
                    }

                    span {
                      font-size: 0.9rem;
                      color: var(--dark-text);
                    }
                  }
                }
              }
            }

            .no-fields-preview {
              display: flex;
              flex-direction: column;
              justify-items: center;
              align-items: center;
              padding: 2rem 1rem;
              color: var(--light-text);

              .iconify {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                opacity: 0.5;
              }

              span {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
}

.mobile-steps {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 60px;
  inset-inline-start: 0;
  height: 65px;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  z-index: 25;
  transform: translateY(-100%);
  transition: transform 0.3s;

  &.is-active {
    transform: translateY(0);
  }

  .steps {
    position: relative;
    top: 10px;
  }

  .steps-segment {
    &.is-active {
      .steps-content {
        opacity: 1 !important;
      }
    }

    .steps-content {
      opacity: 0 !important;
      display: block;
    }
  }
}

.is-dark {
  .stepper-form {
    .form-sections {
      .form-section {
        .page-selection {
          background: var(--dark-sidebar-dark-2);
          border-color: var(--dark-sidebar-light-12);
        }

        .form-section-title {
          span {
            color: var(--dark-dark-text);
          }

          svg {
            color: var(--dark-dark-text);
          }
        }

        .input-button {
          background-color: var(--dark-sidebar-light-2) !important;
          border-color: var(--dark-sidebar-light-12) !important;
          color: var(--dark-dark-text);

          &:hover,
          &:focus {
            color: var(--primary);
            border: 2px solid var(--primary) !important;
          }
        }

        .fieldset {
          background: var(--dark-sidebar-dark-2);
          border-color: var(--dark-sidebar-light-12);
        }

        .fieldset-separator {
          border-color: var(--dark-sidebar-light-12);
        }

        .flex-label h4 {
          color: var(--dark-dark-text);
        }

        .options {
          .option {
            .indicator {
              background: var(--primary);
            }

            input {
              &:checked {
                ~ .indicator {
                  transform: scale(1);
                }

                ~ .option-inner {
                  border-color: var(--primary) !important;

                  i {
                    color: var(--primary);
                  }
                }
              }
            }

            .option-inner {
              background-color: var(--dark-sidebar-light-2) !important;
              border-color: var(--dark-sidebar-light-12) !important;

              h4 {
                color: var(--dark-dark-text);
              }
            }
          }
        }

        .validation-box {
          background-color: var(--dark-sidebar-light-2) !important;
          border-color: var(--dark-sidebar-light-12) !important;

          .box-content h3 {
            color: var(--dark-dark-text);
          }
        }

        .form-section-output {
          .output {
            background-color: var(--dark-sidebar-light-2) !important;
            border-color: var(--dark-sidebar-light-12) !important;
            color: var(--dark-dark-text);

            > span {
              color: var(--dark-dark-text);
            }

            .action {
              button {
                &:hover {
                  background: var(--dark-sidebar-light-5);
                }

                svg {
                  color: var(--light-text);
                }
              }
            }
          }
        }
      }
    }

    .form-stepper {
      .steps {
        &:not(.is-hollow) {
          .steps-marker:not(.is-hollow) {
            background-color: var(--primary);
          }
        }

        .steps-segment {
          &.is-active {
            ~ .steps-segment::after {
              background: var(--dark-sidebar-dark-5);
            }

            ~ .steps-segment {
              .steps-marker:not(.is-hollow) {
                background: var(--dark-sidebar-dark-5);
              }
            }

            &::after {
              background: var(--dark-sidebar-dark-5);
            }

            .steps-content {
              .step-info {
                color: var(--dark-dark-text);
              }
            }
          }

          &::after {
            background-color: var(--primary);
          }
        }
      }
    }
  }
}

@media (width <= 767px) {
  .mobile-steps {
    display: flex;
  }

  .stepper-form {
    padding-top: 0;

    .form-sections {
      padding-inline-end: 0;
      overflow: hidden;

      .form-section {
        .form-section-title {
          button {
            display: none;
          }
        }

        .subcontrol {
          min-width: 138px;
        }

        .options {
          .option {
            width: calc(50% - 1rem);
          }
        }

        .validation-box {
          .box-illustration {
            min-width: 30%;

            img {
              inset-inline-end: -34px;
              bottom: -28px;
            }
          }
        }
      }
    }

    .form-stepper {
      display: none;
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .stepper-form {
    padding-top: 0;

    .form-sections {
      max-width: 500px;
    }

    .form-stepper {
      top: 40px;
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
  .stepper-form {
    padding-top: 0;

    .form-stepper {
      .form-help {
        inset-inline-end: 2rem;
      }
    }
  }
}

.option-input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  .v-input {
    flex: 1;
  }

  .v-icon-button {
    flex-shrink: 0;
  }
}

.field-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-inline-end: 0.75rem;

  .field-main {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .field-name {
    font-weight: 600;
    font-family: var(--font-alt);
    color: var(--dark-text);
  }
}

.no-fields {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--light-text);
  text-align: center;
  flex-direction: column;
  gap: 0.75rem;

  i {
    font-size: 2rem;
    opacity: 0.5;
  }

  span {
    font-size: 0.9rem;
  }
}

.field-actions {
  .edit-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-inline-start: auto;

  .v-icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    width: 38px;
    min-width: 38px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background-color 0.3s;

    &:hover,
    &:focus {
      background: var(--widget-grey-dark-1);
    }

    svg {
      height: 18px;
      width: 18px;
      stroke-width: 1.5px;
    }
  }
}

.add-option-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  .v-button {
    min-height: 40px;
    font-size: 0.9rem;
  }
}

.preview-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.debug-info {
  background: var(--light-grey);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--dark-text);
}

.test-modal-content {
  padding: 2rem;
  text-align: center;

  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    color: var(--dark-text);
  }
}

.native-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.native-modal {
  background: var(--white);
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.native-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border);

  h3 {
    margin: 0;
    color: var(--dark-text);
    font-size: 1rem;
    font-weight: 600;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    color: var(--light-text);

    &:hover {
      background: var(--widget-grey-dark-1);
      color: var(--dark-text);
    }
  }
}

.native-modal-content {
  padding: 1.5rem;

  p {
    margin-bottom: 0.75rem;
    color: var(--dark-text);
  }
}

.preview-modal {
  max-width: 95vw;
  width: 95vw;
  max-height: 95vh;
  height: 95vh;
}

.preview-modal-content {
  padding: 0;
  max-height: calc(95vh - 68px);
  height: calc(95vh - 68px);
  overflow-y: auto;
  scrollbar-width: none;
}

.preview-tabs {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0 1.5rem;

  .tabs {
    &.is-boxed {
      ul {
        border-bottom-color: var(--border);

        li {
          &.is-active {
            .tab-button {
              background-color: var(--primary);
              border-color: var(--primary);
              color: var(--white);
            }
          }

          .tab-button {
            border-color: var(--border);
            color: var(--dark-text);

            &:hover {
              background-color: var(--widget-grey-dark-1);
            }
          }
        }
      }
    }
  }

  .tab-button {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 0.25rem 0.25rem 0 0;
    transition: all 0.3s;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--widget-grey-dark-1);
    }
  }
}

.preview-content {
  padding: 0 1.5rem 1.5rem;

  .page-header {
    margin-bottom: 2rem;
    text-align: left !important;

    .page-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--dark-text);
      margin: 0 0 0.5rem 0;
      text-align: left !important;
    }

    .page-description {
      font-size: 1rem;
      color: var(--light-text);
      margin: 0;
      text-align: left !important;
    }
  }
}

.preview-form {
  background: var(--white);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-field {
    margin-bottom: 1.5rem;

    .field-help {
      font-size: 0.9rem;
      color: var(--light-text);
      margin: 0.5rem 0 0 0;
    }
  }

  .form-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
}

.radio-group,
.multiselect-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.no-fields,
.no-pages {
  text-align: center;
  padding: 2rem;
  color: var(--light-text);

  .iconify {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  span {
    font-size: 0.9rem;
  }
}

// Dark mode support
.is-dark {
  .preview-tabs {
    .tabs.is-boxed {
      ul {
        border-bottom-color: var(--dark-sidebar-light-12);

        li {
          .tab-button {
            border-color: var(--dark-sidebar-light-12);
            color: var(--dark-dark-text);

            &:hover {
              background-color: var(--dark-sidebar-light-5);
            }
          }
        }
      }
    }
  }

  .preview-content {
    .page-header {
      .page-title {
        color: var(--dark-dark-text);
      }
    }
  }
}

// Dark mode support
.is-dark {
  .native-modal {
    background: var(--dark-sidebar-light-3);
  }

  .native-modal-header {
    border-color: var(--dark-sidebar-light-12);

    h3 {
      color: var(--dark-dark-text);
    }
  }
}

.preview-container {
  padding: 2rem;
  max-height: 80vh;
  overflow-y: auto;
}

.preview-tabs {
  margin-bottom: 2rem;

  .tabs {
    &.is-boxed {
      ul {
        border-bottom-color: var(--border);

        li {
          &.is-active {
            a {
              background-color: var(--primary);
              border-color: var(--primary);
              color: var(--white);
            }
          }

          a {
            border-color: var(--border);
            color: var(--dark-text);

            &:hover {
              background-color: var(--widget-grey-dark-1);
            }
          }
        }
      }
    }
  }

  .tab-button {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 0.25rem 0.25rem 0 0;
    transition: all 0.3s;

    &:hover {
      background-color: var(--widget-grey-dark-1);
    }
  }
}

.preview-content {
  max-width: 800px;
  margin: 0 auto;

  .page-header {
    margin-bottom: 2rem;
    text-align: left !important;

    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark-text);
      margin: 0 0 0.5rem 0;
      text-align: left !important;
    }

    .page-description {
      font-size: 1.1rem;
      color: var(--light-text);
      margin: 0;
      text-align: left !important;
    }
  }
}

.preview-form {
  background: var(--white);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-field {
    margin-bottom: 1.5rem;

    .field-help {
      font-size: 0.9rem;
      color: var(--light-text);
      margin: 0.5rem 0 0 0;
    }
  }

  .form-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
}

.radio-group,
.multiselect-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Dark mode support
.is-dark {
  .preview-tabs {
    .tabs.is-boxed {
      ul {
        border-bottom-color: var(--dark-sidebar-light-12);

        li {
          a {
            border-color: var(--dark-sidebar-light-12);
            color: var(--dark-dark-text);

            &:hover {
              background-color: var(--dark-sidebar-light-5);
            }
          }
        }
      }
    }
  }

  .preview-form {
    background: var(--dark-sidebar-light-3);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .preview-content {
    .page-header {
      .page-title {
        color: var(--dark-dark-text);
      }
    }
  }
}
</style>
