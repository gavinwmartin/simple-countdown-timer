import { InstanceBase, InstanceStatus, runEntrypoint } from '@companion-module/base'
import got from 'got'

class CountdownInstance extends InstanceBase {
  constructor(internal) {
    super(internal)
    this.config = {}
  }

  async init(config) {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.initActions()
  }

  async configUpdated(config) {
    this.config = config
    this.initActions()
  }

  getConfigFields() {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Control server host',
        width: 12,
        default: 'localhost',
      },
      {
        type: 'number',
        id: 'port',
        label: 'Control server port',
        width: 6,
        default: 3000,
        min: 1,
        max: 65535,
      },
      {
        type: 'checkbox',
        id: 'ssl',
        label: 'Use HTTPS',
        default: false,
      },
    ]
  }

  initActions() {
    this.setActionDefinitions({
      start: {
        name: 'Start countdown',
        options: [],
        callback: () => this.sendAction('start'),
      },
      pause: {
        name: 'Pause countdown',
        options: [],
        callback: () => this.sendAction('pause'),
      },
      reset: {
        name: 'Reset countdown',
        options: [],
        callback: () => this.sendAction('reset'),
      },
      stop: {
        name: 'Stop countdown',
        options: [],
        callback: () => this.sendAction('stop'),
      },
      fullscreen: {
        name: 'Toggle fullscreen',
        options: [],
        callback: () => this.sendAction('fullscreen'),
      },
    })
  }

  async sendAction(action) {
    const host = this.config.host || 'localhost'
    const port = this.config.port || 3000
    const protocol = this.config.ssl ? 'https' : 'http'
    const url = `${protocol}://${host}:${port}/api/action`

    try {
      await got.post(url, {
        json: { action },
        responseType: 'json',
        timeout: { request: 2000 },
      })
      this.updateStatus(InstanceStatus.Ok)
    } catch (error) {
      this.log('error', `Failed to send ${action}: ${error.message}`)
      this.updateStatus(InstanceStatus.ConnectionFailure)
    }
  }
}

runEntrypoint(CountdownInstance)
