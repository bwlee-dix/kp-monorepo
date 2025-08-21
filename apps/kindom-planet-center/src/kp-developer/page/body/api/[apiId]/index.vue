<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'
import KpSwitchBlock from '/@src/kp-developer/component/KpSwitchBlock.vue'

const viewWrapper = useViewWrapper()
const route = useRoute()
const apiId = computed(() => (route.params as any).apiId || '')

viewWrapper.setPageTitle(`${apiId.value}`)

const isProd = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const requestData = ref<Record<string, any>>({
  env: 'test',
  examId: '',
  questionId: '',
})

const exampleResponse = ref<Record<string, any>>({
  status: 200,
  message: 'Success',
  data: {
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        createdAt: '2024-01-16T14:20:00Z',
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    },
  },
  timestamp: '2024-01-17T09:15:00Z',
})
const exampleResponseBody = ref<Record<string, any>>({
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      createdAt: '2024-01-16T14:20:00Z',
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 2,
    totalPages: 1,
  },
})
const exampleResponseHeader = ref<Record<string, any>>({
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'X-Request-ID': 'req_123456789',
})

const requestTabList = [
  {
    label: 'Authentication',
    value: 'authentication',
  },
  {
    label: 'Data',
    value: 'data',
  },
]

const responseTabList = [
  {
    label: 'Example',
    value: 'example',
  },
  {
    label: 'Request',
    value: 'request',
  },
  {
    label: 'Response',
    value: 'response',
  },
]

const sendRequest = async () => {
  if (!requestData.value.examId || !requestData.value.questionId) {
    return
  }

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('API 요청 성공:', requestData.value)
  } catch (error) {
    console.error('API 요청 실패:', error)
  } finally {
    isLoading.value = false
  }
}

const formatJson = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return '{}'
  }
}

const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'warning'
  if (status >= 500) return 'danger'
  return 'info'
}

const getMethodColor = (method: string): string => {
  const methodColors: Record<string, string> = {
    GET: 'info',
    POST: 'success',
    PUT: 'warning',
    DELETE: 'danger',
    PATCH: 'primary',
  }
  return methodColors[method] || 'info'
}
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout">
      <div class="form-outer">
        <div class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>API Request</h3>
              <h2>Run API with your Request</h2>
            </div>
            <div class="right">
              <VField>
                <VControl>
                  <KpSwitchBlock
                    v-model="isProd"
                    color="success"
                    label-active="Prod"
                    label-inactive="Test"
                  />
                </VControl>
              </VField>
              <VButton color="info" elevated>Send</VButton>
            </div>
          </div>
        </div>
        <div class="form-body is-flex flex-column gap-16">
          <div class="endpoint-container">
            <div class="endpoint-label">Endpoint</div>
            <div class="endpoint-value">
              {{ '/v1/test/api' }}
            </div>
          </div>
          <VTabs selected="data" :tabs="requestTabList">
            <template #tab="{ activeValue }">
              <div v-if="activeValue === 'authentication'">
                <VField label="Authorization" horizontal>
                  <VControl fullwidth icon="lucide:user">
                    <VInput type="text" placeholder="Authorization" />
                  </VControl>
                </VField>
              </div>
              <div v-else-if="activeValue === 'data'">
                <VField label="Env *" horizontal>
                  <VControl fullwidth disabled>
                    <VInput type="text" placeholder="Test" disabled />
                  </VControl>
                </VField>
                <VField label="Exam ID *" horizontal>
                  <VControl fullwidth>
                    <VInput type="text" placeholder="Exam ID" />
                  </VControl>
                </VField>
                <VField label="Question ID *" horizontal>
                  <VControl fullwidth>
                    <VInput type="text" placeholder="Question ID" />
                  </VControl>
                </VField>
              </div>
            </template>
          </VTabs>
        </div>
      </div>
      <div class="form-outer">
        <div class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>API Reference</h3>
              <h2>Check your Request & Response</h2>
            </div>
          </div>
        </div>
        <div class="form-body is-flex flex-column">
          <VTabs selected="example" :tabs="responseTabList">
            <template #tab="{ activeValue }">
              <div v-if="activeValue === 'example'" class="api-example">
                <div class="example-section">
                  <h4 class="section-title">Request Example</h4>
                  <div class="http-info">
                    <div class="method-badge" :class="`is-${getMethodColor('GET')}`">
                      GET
                    </div>
                    <div class="url">https://kpdev.com/api/v1/users</div>
                  </div>
                  <div class="request-details">
                    <div class="detail-item">
                      <span class="label">Content-Type:</span>
                      <span class="value">application/json</span>
                    </div>
                    <div class="detail-item">
                      <span class="label">Authorization:</span>
                      <span class="value">Bearer {token}</span>
                    </div>
                  </div>
                </div>

                <div class="example-section">
                  <h4 class="section-title">Response Example</h4>
                  <div class="response-info">
                    <div class="status-badge" :class="`is-${getStatusColor(200)}`">
                      200 OK
                    </div>
                    <div class="response-time">Response Time: 100ms</div>
                  </div>
                  <div class="json-preview">
                    <pre class="json-content">{{ formatJson(exampleResponse) }}</pre>
                  </div>
                </div>
              </div>

              <div v-else-if="activeValue === 'request'" class="api-request">
                <div class="request-form">
                  <VField label="Environment" horizontal>
                    <VControl fullwidth>
                      <VInput
                        v-model="requestData.env"
                        type="text"
                        icon="lucide:globe"
                        :disabled="true"
                      />
                    </VControl>
                  </VField>

                  <VField label="Exam ID *" horizontal>
                    <VControl fullwidth>
                      <VInput
                        v-model="requestData.examId"
                        type="text"
                        icon="lucide:file-text"
                        placeholder="Enter Exam ID"
                      />
                    </VControl>
                  </VField>

                  <VField label="Question ID *" horizontal>
                    <VControl fullwidth>
                      <VInput
                        v-model="requestData.questionId"
                        type="text"
                        icon="lucide:help-circle"
                        placeholder="Enter Question ID"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>

              <div v-else-if="activeValue === 'response'" class="api-response">
                <div class="response-header">
                  <div class="response-status">
                    <div class="status-badge" :class="`is-${getStatusColor(200)}`">
                      200 OK
                    </div>
                    <span class="response-time">100ms</span>
                  </div>
                  <div class="response-meta">
                    <span class="meta-item">
                      <VIcon icon="lucide:clock" />
                      Timestamp: {{ new Date().toISOString() }}
                    </span>
                    <span class="meta-item">
                      <VIcon icon="lucide:database" />
                      Size: 2.1 KB
                    </span>
                  </div>
                </div>

                <div class="response-body">
                  <div class="response-content">
                    <div class="response-title">Response Header</div>
                    <pre class="json-content">{{
                      formatJson(exampleResponseHeader)
                    }}</pre>
                  </div>
                  <div class="response-content">
                    <div class="response-title">Response Body</div>
                    <pre class="json-content">{{ formatJson(exampleResponseBody) }}</pre>
                  </div>
                </div>
              </div>
            </template>
          </VTabs>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;

  .app-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttons {
    gap: 1rem;
  }

  .form-outer {
    .form-header {
      .form-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .right {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;

          .field:not(:last-child) {
            margin-bottom: initial;
          }
        }
      }

      .form-body {
        padding: 0;
      }
    }
    .form-body {
      .endpoint-container {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .endpoint-label {
          font-size: 12px;
          font-weight: 400;
          color: var(--light-text);
        }

        .endpoint-value {
          padding: 8px 12px;
          border-radius: 4px;
          background-color: var(--placeload-nuance-from);
          font-size: 14px;
          font-weight: 400;
        }
      }

      padding: 24px;

      .tabs-wrapper {
        .tab-content {
          .field {
            .field-label {
              text-align: left;
            }
          }
        }
      }
    }
  }
}

.api-example {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .example-section {
    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--dark);
      border-bottom: 2px solid var(--light-grey);
      padding-bottom: 0.5rem;
    }

    .http-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .method-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.875rem;
        text-transform: uppercase;
        min-width: 60px;
        text-align: center;

        &.is-info {
          background: var(--info);
          color: white;
        }
        &.is-success {
          background: var(--success);
          color: white;
        }
        &.is-warning {
          background: var(--warning);
          color: white;
        }
        &.is-danger {
          background: var(--danger);
          color: white;
        }
        &.is-primary {
          background: var(--primary);
          color: white;
        }
      }

      .url {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
        color: var(--dark);
        background: var(--light-grey);
        padding: 0.5rem 0.75rem;
        border-radius: 4px;
        flex: 1;
      }
    }

    .request-details {
      .detail-item {
        display: flex;
        margin-bottom: 0.5rem;

        .label {
          font-weight: 600;
          min-width: 120px;
          color: var(--dark);
        }

        .value {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          color: var(--primary);
        }
      }
    }

    .response-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.875rem;

        &.is-success {
          background: var(--success);
          color: white;
        }
        &.is-warning {
          background: var(--warning);
          color: white;
        }
        &.is-danger {
          background: var(--danger);
          color: white;
        }
        &.is-info {
          background: var(--info);
          color: white;
        }
      }

      .response-time {
        color: var(--light-text);
        font-size: 0.875rem;
      }
    }

    .json-preview {
      overflow-x: auto;

      .json-content {
        color: var(--dark-text);
        background: var(--light-grey);
        font-size: 0.875rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }
  }
}

.api-request {
  .request-form {
    max-width: 600px;

    .request-actions {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--light-grey);
    }
  }
}

.api-response {
  .response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--light-grey);
    border-radius: 8px;

    .response-status {
      display: flex;
      align-items: center;
      gap: 1rem;

      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.875rem;

        &.is-success {
          background: var(--success);
          color: white;
        }
        &.is-warning {
          background: var(--warning);
          color: white;
        }
        &.is-danger {
          background: var(--danger);
          color: white;
        }
        &.is-info {
          background: var(--info);
          color: white;
        }
      }

      .response-time {
        color: var(--light-text);
        font-size: 0.875rem;
      }
    }

    .response-meta {
      display: flex;
      gap: 1rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--light-text);

        .icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .response-body {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .response-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .response-title {
        font-size: 1rem;
        font-weight: 500;
        color: var(--light-text);
      }

      .json-content {
        color: var(--dark-text);
        background: var(--light-grey);
        font-size: 0.875rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }

    .headers-response {
      .header-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        border-bottom: 1px solid var(--light-grey);

        &:last-child {
          border-bottom: none;
        }

        .header-name {
          font-weight: 600;
          color: var(--dark);
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .header-value {
          color: var(--primary);
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
      }
    }
  }
}

.is-dark {
  .api-example {
    .example-section {
      .section-title {
        color: var(--dark-dark-text);
        border-bottom: 2px solid var(--dark-sidebar-light-12);
      }
      .http-info {
        .url {
          background: var(--dark-sidebar-light-12);
          color: var(--dark-dark-text);
        }
      }
      .request-details {
        .detail-item {
          .label {
            color: var(--dark-dark-text);
          }
        }
      }
      .json-preview {
        .json-content {
          color: var(--dark-dark-text);
          background: var(--dark-sidebar-light-12);
        }
      }
    }
  }

  .api-response {
    .response-header {
      background: var(--dark-sidebar-light-12);
    }
    .response-body {
      .response-content {
        .response-title {
        }
        .json-content {
          color: var(--dark-dark-text);
          background: var(--dark-sidebar-light-12);
        }
      }
    }
  }
}
</style>
