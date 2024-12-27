import PostCard from './PostCardOld.vue'
import axios from 'axios'
import { mount, flushPromises } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
}

describe('PostCard', () => {
  it('can fetch and display a post', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockPost })

    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })
    expect(wrapper.find('[data-testid="loader"]')).toBeTruthy()
    await flushPromises()
    expect(wrapper.find('[data-testid="post-title"]').text()).toBe(mockPost.title)
    expect(wrapper.vm.post.title).toContain(mockPost.title)
  })
  it('can display an error message if fetching a post fails', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch post'))
    const wrapper = mount(PostCard)
    expect(wrapper.vm.loading).toBeTruthy()
    expect(wrapper.find('[data-testid="loader"]')).toBeTruthy()
    await flushPromises()
    expect(wrapper.find('[data-testid="error-message"]').text()).toContain('Failed to fetch post')
  })
})
