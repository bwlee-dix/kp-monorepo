<template>
  <div class="preview-wrapper">
    <div class="preview-header">
      <div class="preview-nav">
        <div class="left">
          <RouterLink
            to="/builder"
            class="back-button"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:arrow-left"
            />
            Back to Builder
          </RouterLink>
        </div>
        <div class="center">
          <h1 class="preview-title">
            Web Application Preview
          </h1>
        </div>
        <div class="right">
          <button
            type="button"
            class="button is-primary"
            @click="publishApp"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:check"
            />
            Publish App
          </button>
        </div>
      </div>
    </div>

    <div class="preview-content">
      <!-- Debug Info -->
      <div class="debug-info">
        <p>Debug: isLoading = {{ isLoading }}, pages.length = {{ pages.length }}, currentPageId = {{ currentPageId }}</p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="loading-state"
      >
        <div class="loading-spinner">
          <i
            aria-hidden="true"
            class="iconify"
            data-icon="feather:loader"
          />
        </div>
        <p class="loading-text">
          Loading your web application...
        </p>
      </div>

      <!-- Page Navigation -->
      <div
        v-else-if="pages.length > 1"
        class="page-navigation"
      >
        <div class="nav-tabs">
          <button
            v-for="page in pages"
            :key="page.id"
            :class="['nav-tab', { 'is-active': currentPageId === page.id }]"
            @click="switchPage(page.id)"
          >
            {{ page.name }}
          </button>
        </div>
      </div>

      <!-- Page Content -->
      <div
        v-for="page in pages"
        v-else-if="!isLoading && pages.length > 0"
        v-show="currentPageId === page.id"
        :key="page.id"
        class="page-content"
      >
        <div class="page-header">
          <h2 class="page-title">
            {{ page.name }}
          </h2>
          <p
            v-if="page.description"
            class="page-description"
          >
            {{ page.description }}
          </p>
        </div>

        <!-- Form Fields -->
        <form
          v-if="page.fields && page.fields.length > 0"
          class="preview-form"
          @submit.prevent="submitForm"
        >
          <div
            v-for="field in page.fields"
            :key="field.id"
            class="form-field"
          >
            <label
              :for="field.id"
              class="field-label"
            >
              {{ field.name }}
              <span
                v-if="field.required"
                class="required-mark"
              >*</span>
            </label>

            <!-- Text Input -->
            <input
              v-if="field.type === 'Text'"
              :id="field.id"
              v-model="formData[field.id]"
              type="text"
              class="input"
              :placeholder="field.description || `Enter ${field.name.toLowerCase()}`"
              :required="field.required"
            >

            <!-- Textarea -->
            <textarea
              v-else-if="field.type === 'Textarea'"
              :id="field.id"
              v-model="formData[field.id]"
              class="textarea"
              :placeholder="field.description || `Enter ${field.name.toLowerCase()}`"
              :required="field.required"
              rows="4"
            />

            <!-- Number Input -->
            <input
              v-else-if="field.type === 'Number'"
              :id="field.id"
              v-model="formData[field.id]"
              type="number"
              class="input"
              :placeholder="field.description || `Enter ${field.name.toLowerCase()}`"
              :required="field.required"
            >

            <!-- Date Input -->
            <input
              v-else-if="field.type === 'Date'"
              :id="field.id"
              v-model="formData[field.id]"
              type="date"
              class="input"
              :required="field.required"
            >

            <!-- Address Input -->
            <input
              v-else-if="field.type === 'Address'"
              :id="field.id"
              v-model="formData[field.id]"
              type="text"
              class="input"
              :placeholder="field.description || 'Enter address'"
              :required="field.required"
            >

            <!-- Radio Buttons -->
            <div
              v-else-if="field.type === 'Radio'"
              class="radio-group"
            >
              <label
                v-for="(option, index) in field.options"
                :key="index"
                class="radio-option"
              >
                <input
                  :id="`${field.id}-${index}`"
                  v-model="formData[field.id]"
                  type="radio"
                  :name="field.id"
                  :value="option"
                  :required="field.required"
                >
                <span class="radio-label">{{ option }}</span>
              </label>
            </div>

            <!-- Multi-Select -->
            <div
              v-else-if="field.type === 'Multi-Select'"
              class="multiselect-group"
            >
              <label
                v-for="(option, index) in field.options"
                :key="index"
                class="checkbox-option"
              >
                <input
                  :id="`${field.id}-${index}`"
                  v-model="formData[field.id]"
                  type="checkbox"
                  :value="option"
                  :required="field.required && (!formData[field.id] || formData[field.id].length === 0)"
                >
                <span class="checkbox-label">{{ option }}</span>
              </label>
            </div>

            <!-- Field Description -->
            <p
              v-if="field.description"
              class="field-help"
            >
              {{ field.description }}
            </p>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="button is-primary is-fullwidth"
            >
              Submit
            </button>
          </div>
        </form>

        <!-- No Fields Message -->
        <div
          v-else
          class="no-fields"
        >
          <i
            aria-hidden="true"
            class="iconify"
            data-icon="feather:info"
          />
          <span>No fields configured for this page.</span>
        </div>
      </div>

      <!-- No Pages Message -->
      <div
        v-else-if="!isLoading && pages.length === 0"
        class="no-pages"
      >
        <i
          aria-hidden="true"
          class="iconify"
          data-icon="feather:info"
        />
        <span>No pages found. Please complete the builder configuration first.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotyf } from '/@src/composable/useNotyf'

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

// Load actual builder configuration from localStorage
const pages = ref<Array<{ id: string; name: string; description: string; fields: Field[] }>>([])
const currentPageId = ref('')
const formData = ref<Record<string, any>>({})
const isLoading = ref(true)

onMounted(() => {
  console.log('Preview page mounted')
  console.log('Current route:', router.currentRoute.value.path)
  
  // Add a small delay to ensure the page is fully mounted
  setTimeout(() => {
    console.log('Starting to load builder config...')
    loadBuilderConfig()
  }, 100)
})

const loadBuilderConfig = () => {
  console.log('loadBuilderConfig called')
  isLoading.value = true
  
  // Load builder configuration from localStorage
  const savedConfig = localStorage.getItem('builderConfig')
  console.log('Saved config from localStorage:', savedConfig)
  
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig)
      console.log('Parsed config:', config)
      pages.value = config.pages || []
      console.log('Pages loaded:', pages.value)
      
      // Set first page as current if pages exist
      if (pages.value.length > 0) {
        currentPageId.value = pages.value[0].id
        console.log('Current page ID set to:', currentPageId.value)
      }
      
      // Initialize form data for all fields
      pages.value.forEach(page => {
        page.fields.forEach((field: Field) => {
          if (field.type === 'Multi-Select') {
            formData.value[field.id] = []
          } else {
            formData.value[field.id] = ''
          }
        })
      })
      
      console.log('Form data initialized:', formData.value)
      console.log('Builder configuration loaded successfully:', pages.value)
    } catch (error) {
      console.error('Error loading builder configuration:', error)
      notyf.error('Failed to load builder configuration')
    }
  } else {
    console.log('No builder configuration found in localStorage')
    notyf.error('No builder configuration found. Please complete the builder first.')
    // Redirect back to builder
    setTimeout(() => {
      router.push('/builder')
    }, 2000)
  }
  
  // Set loading to false after a short delay to ensure smooth transition
  setTimeout(() => {
    console.log('Setting isLoading to false')
    isLoading.value = false
  }, 200)
}

const switchPage = (pageId: string) => {
  currentPageId.value = pageId
  // Reset form data when switching pages
  formData.value = {}
}

const submitForm = () => {
  // Validate required fields
  const currentPage = pages.value.find(page => page.id === currentPageId.value)
  if (!currentPage) return

  const errors: string[] = []
  
  currentPage.fields.forEach(field => {
    if (field.required) {
      if (field.type === 'Multi-Select') {
        if (!formData.value[field.id] || formData.value[field.id].length === 0) {
          errors.push(`${field.name} is required`)
        }
      } else {
        if (!formData.value[field.id] || formData.value[field.id].toString().trim() === '') {
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
  console.log('Form data:', formData.value)
  
  // Reset form
  formData.value = {}
}

const publishApp = () => {
  notyf.success('App published successfully!')
  // In real app, this would save the configuration and deploy the app
}
</script>

<style lang="scss" scoped>
.preview-wrapper {
  min-height: 100vh;
  background: var(--widget-grey);
}

.preview-header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.preview-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  .left {
    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--dark-text);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        color: var(--primary);
      }
    }
  }

  .center {
    .preview-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark-text);
      margin: 0;
    }
  }

  .right {
    .button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}

.preview-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.debug-info {
  background: var(--light-grey);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--dark-text);
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  
  .loading-spinner {
    margin-bottom: 1rem;
    
    .iconify {
      font-size: 3rem;
      color: var(--primary);
      animation: spin 1s linear infinite;
    }
  }
  
  .loading-text {
    font-size: 1.1rem;
    color: var(--light-text);
    margin: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.page-navigation {
  margin-bottom: 2rem;
  
  .nav-tabs {
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid var(--border);
    
    .nav-tab {
      padding: 0.75rem 1.5rem;
      border: none;
      background: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--light-text);
      font-weight: 500;
      
      &:hover {
        color: var(--dark-text);
      }
      
      &.is-active {
        color: var(--primary);
        border-bottom-color: var(--primary);
      }
    }
  }
}

.page-content {
  .page-header {
    margin-bottom: 2rem;
    text-align: center;
    
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark-text);
      margin: 0 0 0.5rem 0;
    }
    
    .page-description {
      font-size: 1.1rem;
      color: var(--light-text);
      margin: 0;
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
    
    .field-label {
      display: block;
      font-weight: 500;
      color: var(--dark-text);
      margin-bottom: 0.5rem;
      
      .required-mark {
        color: var(--danger);
        margin-left: 0.25rem;
      }
    }
    
    .input,
    .textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 0.25rem;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
      }
    }
    
    .textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .radio-group,
    .multiselect-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      .radio-option,
      .checkbox-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        
        input[type="radio"],
        input[type="checkbox"] {
          margin: 0;
        }
        
        .radio-label,
        .checkbox-label {
          color: var(--dark-text);
        }
      }
    }
    
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
    
    .button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

.no-fields,
.no-pages {
  text-align: center;
  padding: 3rem;
  color: var(--light-text);
  
  .iconify {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
}

// Dark mode support
.is-dark {
  .preview-wrapper {
    background: var(--dark-sidebar-light-5);
  }
  
  .preview-header {
    background: var(--dark-sidebar-light-3);
    border-color: var(--dark-sidebar-light-12);
  }
  
  .preview-form {
    background: var(--dark-sidebar-light-3);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .nav-tabs {
    border-color: var(--dark-sidebar-light-12);
  }
  
  .debug-info {
    background: var(--dark-sidebar-light-8);
  }
}
</style>