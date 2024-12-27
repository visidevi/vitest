import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'
import { describe, it, expect } from 'vitest'

describe('NotificationToast', () => {
  it('renders the correct style for error', () => {
    const status = 'error'
    const wrapper = mount(NotificationToast, {
      props: { status, message: 'Hello' },
    })
    expect(wrapper.classes()).toContain('notification--error')
  })
  it('renders the correct style for success', () => {
    const message = ''
    const wrapper = mount(NotificationToast, {
      props: { message },
    })
    expect(wrapper.classes('notification--slide')).toBe(true)
  })
  it('renders the correct style for warning', async () => {
    const wrapper = mount(NotificationToast, {
      data() {
        return { clicked: true }
      },
    })
    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clear-notification')
  })
  it('renders the correct message to viewer', () => {
    const status = 'info'
    const message = 'Something went wrong'
    const wrapper = mount(NotificationToast, {
      props: { status, message },
    })
    expect(wrapper.find('p').text()).toContain(message)
    expect(wrapper.classes()).toContain('notification--info')
  })
})
