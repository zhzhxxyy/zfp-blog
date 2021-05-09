import React from "react";
import Search from "../components/Search";
import { shallow, configure } from "enzyme";

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


// case1 测试组件是否正常渲染
// 通过查找存在 input 和 button,测试组件正常渲染
describe("SearchView", () => {
  it("SearchView Component should be render", () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.find("button").exists()).toBeTruthy();
  });
});

// case2 测试组件点击事件是否能正常执行
describe("executes a handler function on button", () => {
  const mockEvent = {
    onSubmit: jest.fn()
  };

  it("Onsubmit works", () => {
    // 通过 shallow
    const wrapper = shallow(<Search search={mockEvent.onSubmit} />);
    // 通过 find 查找 button
    const button = wrapper.find("button");
    // 模拟提交
    button.simulate("click");
    expect(mockEvent.onSubmit).toBeCalled();
  });
});