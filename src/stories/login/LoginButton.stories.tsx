import { Meta, StoryObj } from "@storybook/nextjs";
import LoginButton from "../../components/login/LoginButton";

export default {
  component: LoginButton,
} as Meta<typeof LoginButton>;

export const Default: StoryObj<typeof LoginButton> = {
  args: {
    loading: false,
    handleClick: () => {},
  },
};
