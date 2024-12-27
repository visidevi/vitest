import { mount } from '@vue/test-utils'
import PostCard from './PostCard.vue'

describe('Post Card Component', () => {
  test('created posts renders correctly', () => {
    const title = 'First Post'
    const body = 'This is my first simple post'
    const wrapper = mount(PostCard, {
      props: { title, body },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
