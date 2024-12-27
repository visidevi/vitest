import { mount, flushPromises } from '@vue/test-utils'
import Axios from 'axios'
import App from './App.vue'
import { describe, expect, vi } from 'vitest'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum',
}

describe('App', () => {
  it('submits the form and displays the post', async () => {
    // Mock the Axios POST request
    vi.spyOn(Axios, 'post').mockResolvedValue({ data: mockPost })

    // Mount the component
    const wrapper = mount(App)

    // Fill out the form inputs
    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

    await wrapper.find('[data-testid="post-form"]').trigger('submit')

    // expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

    await flushPromises()
    // Log the wrapper's HTML for debugging
    console.log(wrapper.html())

    expect(wrapper.text()).toContain(mockPost.title)
    expect(wrapper.text()).toContain(mockPost.body)
  })
  describe('when the API request fails', () => {
    it('when attempting to create a post with incomplete fields', async () => {
      const wrapper = mount(App)

      await wrapper.find('[data-testid="post-form"]').trigger('submit')
      await flushPromises()
      expect(wrapper.html()).toContain('Please input post title')

      // click the close button
      await wrapper.find('[data-testid="close-notification"]').trigger('click')

      // assert that the error message is no longer displayed
      expect(wrapper.html()).not.toContain('Please input post title')
      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="post-form"]').trigger('submit')
      await flushPromises()
      expect(wrapper.html()).toContain('Please input post body')
    })
    it('when creating a new post fails', async () => {
      vi.spyOn(Axios, 'post').mockRejectedValue(new Error('Failed to create post'))
      const wrapper = mount(App)

      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)
      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      await flushPromises()

      expect(wrapper.html()).toContain('Failed to create post')
    })
  })
})
