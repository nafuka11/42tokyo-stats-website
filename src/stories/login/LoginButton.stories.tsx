import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import LoginButton from "../../components/login/LoginButton";

export default {
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

export const Default: ComponentStoryObj<typeof LoginButton> = {
  args: {
    loading: false,
    handleClick: () => {},
  },
};
