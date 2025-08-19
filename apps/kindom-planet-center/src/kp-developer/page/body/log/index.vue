<script setup lang="ts">
import { ref } from 'vue'
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Log')

const filters = ref<string>('')
const selectedTimeRange = ref<string>('Last 1 hour')

const expandedLogs = ref<Set<number>>(new Set())

const toggleLog = (index: number) => {
  if (expandedLogs.value.has(index)) {
    expandedLogs.value.delete(index)
  } else {
    expandedLogs.value.add(index)
  }
}

const isLogExpanded = (index: number) => {
  return expandedLogs.value.has(index)
}

const data = [
  {
    title: 'GET /api/v1/users - 200 (100ms)',
    method: 'GET',
    httpReguest: '{9}',
    insertId: '1234567890',
    jsonPayload: '{13}',
    logName: 'projects/kp-developer/log/api/v1/users',
    receiveTimestamp: '2025-07-18T10:00:00.000Z',
    resource: '{2}',
    severity: 'ERROR',
    timestamp: '2025-07-18T10:00:00.000Z',
  },
  {
    title: 'POST /api/v1/users - 200 (150ms)',
    method: 'POST',
    httpReguest: '{15}',
    insertId: '1234567891',
    jsonPayload: '{25}',
    logName: 'projects/kp-developer/log/api/v1/users',
    receiveTimestamp: '2025-07-18T10:01:00.000Z',
    resource: '{3}',
    severity: 'INFO',
    timestamp: '2025-07-18T10:01:00.000Z',
  },
  {
    title: 'GET /api/v1/exams - 200 (80ms)',
    method: 'GET',
    httpReguest: '{12}',
    insertId: '1234567892',
    jsonPayload: '{18}',
    logName: 'projects/kp-developer/log/api/v1/exams',
    receiveTimestamp: '2025-07-18T10:02:00.000Z',
    resource: '{4}',
    severity: 'WARNING',
    timestamp: '2025-07-18T10:02:00.000Z',
  },
]

const subData = [
  {
    title: 'httpRequest: ' + data[0].httpReguest,
    id: '1234567890',
    method: 'GET',
    url: 'https://api.example.com/users',
    status: '200',
    responseTime: '100ms',
  },
  {
    title: 'httpRequest: ' + data[1].httpReguest,
    id: '1234567891',
    method: 'POST',
    url: 'https://api.example.com/users',
    status: '200',
    responseTime: '150ms',
  },
  {
    title: 'httpRequest: ' + data[2].httpReguest,
    id: '1234567892',
    method: 'GET',
    url: 'https://api.example.com/exams',
    status: '200',
    responseTime: '80ms',
  },
]
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout">
      <div class="form-outer">
        <div class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>API Logs</h3>
              <h2>Check your API log</h2>
            </div>
          </div>
        </div>
        <div class="form-body is-flex flex-column">
          <VField class="is-flex flex-row gap-12 p-t-24 px-24">
            <VDropdown :title="selectedTimeRange" left down>
              <template #content>
                <a
                  href="#"
                  class="dropdown-item"
                  @click="selectedTimeRange = 'Last 1 hour'"
                >
                  Last 1 hour
                </a>
                <hr class="dropdown-divider" />
                <a
                  href="#"
                  class="dropdown-item"
                  @click="selectedTimeRange = 'Last 1 day'"
                >
                  Last 1 day
                </a>
                <hr class="dropdown-divider" />
                <a
                  href="#"
                  class="dropdown-item"
                  @click="selectedTimeRange = 'Last 1 week'"
                >
                  Last 1 week
                </a>
              </template>
            </VDropdown>
            <VControl icon="feather:search" fullwidth>
              <input
                v-model="filters"
                class="input custom-text-filter"
                placeholder="Search..."
              />
            </VControl>
          </VField>

          <div class="log-entries-container">
            <div class="log-entries-header">
              <span>Severity</span>
              <span>Time</span>
              <span>Summary</span>
            </div>
            <div class="log-entries" :open="isLogExpanded(0) || undefined">
              <div class="log-entry">
                <div class="log-header" @click="toggleLog(0)">
                  <div class="log-severity">
                    <div class="collapse-icon" :open="isLogExpanded(0) || undefined">
                      <VIcon :icon="'feather:chevron-down'" />
                    </div>
                    <span class="severity-badge severity-error">error</span>
                  </div>
                  <div class="log-time">7/18/25 10:00:00 AM</div>
                  <div class="log-summary">
                    <VTag color="light" label="GET" rounded />
                    <VTag color="danger" label="400" rounded />
                    <VTag color="light" label="369 B" rounded />
                    <VTag color="light" label="803ms" rounded />
                    /live/exam/3939393910030/293949
                  </div>
                </div>
                <div v-show="isLogExpanded(0)" class="log-details">
                  <VCollapseApi :items="[data[0]]" with-chevron>
                    <template #item-0-content="{ item }">
                      <div class="log-item-details">
                        <div class="log-item-details-li">
                          <VCollapseApiSub :items="[subData[0]]" with-chevron>
                            <template #item-0-content="{ item }">
                              <div>id: {{ item.id }}</div>
                              <div>method: {{ item.method }}</div>
                              <div>url: {{ item.url }}</div>
                              <div>status: {{ item.status }}</div>
                              <div>responseTime: {{ item.responseTime }}</div>
                            </template>
                          </VCollapseApiSub>
                          <div class="log-item-details-item">
                            insertId: {{ item.insertId }}
                          </div>
                          <div class="log-item-details-item">
                            jsonPayload: {{ item.jsonPayload }}
                          </div>
                          <div class="log-item-details-item">
                            logName: {{ item.logName }}
                          </div>
                          <div class="log-item-details-item">
                            receiveTimestamp: {{ item.receiveTimestamp }}
                          </div>
                          <div class="log-item-details-item">
                            resource: {{ item.resource }}
                          </div>
                          <div class="log-item-details-item">
                            severity: {{ item.severity }}
                          </div>
                          <div class="log-item-details-item">
                            timestamp: {{ item.timestamp }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </VCollapseApi>
                </div>
              </div>
            </div>
            <div class="log-entries" :open="isLogExpanded(1) || undefined">
              <div class="log-entry">
                <div class="log-header" @click="toggleLog(1)">
                  <div class="log-severity">
                    <div class="collapse-icon" :open="isLogExpanded(1) || undefined">
                      <VIcon :icon="'feather:chevron-down'" />
                    </div>
                    <span class="severity-badge severity-error">info</span>
                  </div>
                  <div class="log-time">7/18/25 10:00:00 AM</div>
                  <div class="log-summary">
                    <VTag color="light" label="POST" rounded />
                    <VTag color="info" label="200" rounded />
                    <VTag color="light" label="369 B" rounded />
                    <VTag color="light" label="803ms" rounded />
                    /live/exam/3939393910030/293949
                  </div>
                </div>
                <div v-show="isLogExpanded(1)" class="log-details">
                  <VCollapseApi :items="[data[1]]" with-chevron>
                    <template #item-0-content="{ item }">
                      <div class="log-item-details">
                        <div class="log-item-details-li">
                          <VCollapseApiSub :items="[subData[1]]" with-chevron>
                            <template #item-0-content="{ item }">
                              <div>id: {{ item.id }}</div>
                              <div>method: {{ item.method }}</div>
                              <div>url: {{ item.url }}</div>
                              <div>status: {{ item.status }}</div>
                              <div>responseTime: {{ item.responseTime }}</div>
                            </template>
                          </VCollapseApiSub>
                          <div class="log-item-details-item">
                            insertId: {{ item.insertId }}
                          </div>
                          <div class="log-item-details-item">
                            jsonPayload: {{ item.jsonPayload }}
                          </div>
                          <div class="log-item-details-item">
                            logName: {{ item.logName }}
                          </div>
                          <div class="log-item-details-item">
                            receiveTimestamp: {{ item.receiveTimestamp }}
                          </div>
                          <div class="log-item-details-item">
                            resource: {{ item.resource }}
                          </div>
                          <div class="log-item-details-item">
                            severity: {{ item.severity }}
                          </div>
                          <div class="log-item-details-item">
                            timestamp: {{ item.timestamp }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </VCollapseApi>
                </div>
              </div>
            </div>
            <div class="log-entries" :open="isLogExpanded(2) || undefined">
              <div class="log-entry">
                <div class="log-header" @click="toggleLog(2)">
                  <div class="log-severity">
                    <div class="collapse-icon" :open="isLogExpanded(2) || undefined">
                      <VIcon :icon="'feather:chevron-down'" />
                    </div>
                    <span class="severity-badge severity-error">warning</span>
                  </div>
                  <div class="log-time">7/18/25 10:00:00 AM</div>
                  <div class="log-summary">
                    <VTag color="light" label="GET" rounded />
                    <VTag color="info" label="200" rounded />
                    <VTag color="light" label="369 B" rounded />
                    <VTag color="light" label="803ms" rounded />
                    /live/exam/3939393910030/293949
                  </div>
                </div>
                <div v-show="isLogExpanded(2)" class="log-details">
                  <VCollapseApi :items="[data[2]]" with-chevron>
                    <template #item-0-content="{ item }">
                      <div class="log-item-details">
                        <div class="log-item-details-li">
                          <VCollapseApiSub :items="[subData[2]]" with-chevron>
                            <template #item-0-content="{ item }">
                              <div>id: {{ item.id }}</div>
                              <div>method: {{ item.method }}</div>
                              <div>url: {{ item.url }}</div>
                              <div>status: {{ item.status }}</div>
                              <div>responseTime: {{ item.responseTime }}</div>
                            </template>
                          </VCollapseApiSub>
                          <div class="log-item-details-item">
                            insertId: {{ item.insertId }}
                          </div>
                          <div class="log-item-details-item">
                            jsonPayload: {{ item.jsonPayload }}
                          </div>
                          <div class="log-item-details-item">
                            logName: {{ item.logName }}
                          </div>
                          <div class="log-item-details-item">
                            receiveTimestamp: {{ item.receiveTimestamp }}
                          </div>
                          <div class="log-item-details-item">
                            resource: {{ item.resource }}
                          </div>
                          <div class="log-item-details-item">
                            severity: {{ item.severity }}
                          </div>
                          <div class="log-item-details-item">
                            timestamp: {{ item.timestamp }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </VCollapseApi>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
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
    .form-body {
      padding: 0;
    }
  }
}

.log-entries-container {
  .log-entries-header {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid var(--dark-sidebar-light-12);

    span {
      font-weight: 600;
      font-size: 1.125rem;
    }
  }

  .log-entries {
    padding: 24px;
    border-bottom: 1px solid var(--dark-sidebar-light-12);
    &[open] {
      background-color: var(--dark-sidebar-light-4);
    }
    .log-entry {
      border-radius: 8px;
      overflow: hidden;

      .log-header {
        display: grid;
        grid-template-columns: 1fr 1fr 3fr;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s ease;

        .collapse-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          width: 30px;
          background: var(--white);
          border-radius: var(--radius-rounded);
          border: 1px solid transparent;
          transition: all 0.3s;

          > span {
            display: block;
            height: 16px;
            width: 16px;
          }

          &[open] {
            transform: rotate(calc(var(--transform-direction) * 180deg));
            background: var(--dark-sidebar-light-2);
            border-color: var(--dark-sidebar-light-4);
          }
        }

        &:hover {
          background-color: var(--light-bg);
        }

        .log-severity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .log-time {
          color: var(--light-text);
          font-size: 0.875rem;
        }

        .log-summary {
          display: flex;
          flex-direction: row;
          gap: 8px;
        }
      }
    }
  }

  .log-item-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;

    .log-item-details-li {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 16px;

      .log-item-details-item {
        padding-left: 24px;
        color: var(--light-text);
      }
    }

    .log-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .status {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;

        &.status-success {
          background-color: var(--green);
          color: white;
        }

        &.status-error {
          background-color: var(--red);
          color: white;
        }
      }

      .response-time {
        color: var(--light-text);
        font-size: 0.875rem;
      }

      .timestamp {
        color: var(--light-text);
        font-size: 0.875rem;
        margin-left: auto;
      }
    }
  }
}

.is-dark {
  .log-entries-container {
    .log-entries {
      .log-entry {
        .log-header {
          .collapse-icon {
            background: var(--black);

            &[open] {
              background: var(--dark-sidebar-light-2);
              border-color: var(--dark-sidebar-light-4);
            }
          }
        }
      }
    }
  }
}
</style>
