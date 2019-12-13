import React from "react";
import ReactDOM from "react-dom";
import PureTaskList from "./TaskList";
import { withPinnedTasks, defaultTasks } from "./TaskList.stories";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";

const store = {
  getState: () => {
    return {
      tasks: withPinnedTasks
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch")
};

it("renders pinned tasks at the start of the list", () => {
  const div = document.createElement("div");
  const events = { onPinTask: jest.fn(), onArchiveTask: jest.fn() };
  ReactDOM.render(
    <Provider store={store}>
      <PureTaskList tasks={withPinnedTasks} {...events} />
    </Provider>,
    div
  );

  // We expect the task titled "Task 6 (pinned)" to be rendered first, not at the end
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
  );
  expect(lastTaskInput).not.toBe(null);

  ReactDOM.unmountComponentAtNode(div);
});