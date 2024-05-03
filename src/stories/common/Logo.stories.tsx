import { Meta, StoryObj } from "@storybook/react";
import Logo from "../../components/common/Logo";

export default {
  component: Logo,
} as Meta<typeof Logo>;

export const Default: StoryObj<typeof Logo> = {
  args: {},
};
