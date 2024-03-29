import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Task from './Task'
import { withKnobs, object } from "@storybook/addon-knobs/react";

export const task = {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2019, 0, 1, 9, 0),
};

export const actions = {
    onPinTask: action('onPinTask'),
    onArchiveTask: action('onArchiveTask'),
};

const longTitle = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not`;

storiesOf("Task", module)
  .addDecorator(withKnobs)
  .addParameters({
    assets: ["../../public/designs/app.png", "../../public/designs/items.png"]
  })
  .add("default", () => {
    return <Task task={object("task", { ...task })} {...actions} />;
  })
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ))
  .add("long title", () => {
    return (
      <Task
        task={object("task with long title", { ...task, title: longTitle })}
        {...actions}
      />
    );
  });