import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import Logo from "../../components/common/Logo";

export default {
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const Default: ComponentStoryObj<typeof Logo> = {
  args: {},
};
