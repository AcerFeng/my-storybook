import { mount } from '@vue/test-utils'
import BaseButton from '../../components/button/BaseButton.vue'

describe('Button', () => {
  it('create', () => {
    const wrapper = mount(BaseButton, {
      propsData: {
        label: 'testlabel',
        type: 'normal',
      },
    })
    expect(wrapper.find('.btn').text()).toEqual('testlabel')
    expect((wrapper.vm as any).visible).toBe(true)
  })
})
