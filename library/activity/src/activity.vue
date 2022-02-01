<template>
  <div class="activity">
    <ui-input-calendar v-model="value" label="Calendar" />
    <ui-tabs v-model="tab">
      <ui-tab name="1">Tab #1</ui-tab>
      <ui-tab name="2">Tab #2</ui-tab>
    </ui-tabs>
    <ui-stepper v-model="step" total="6" label="Stepper" />
    <ui-stepper v-model="step" total="6"> Stepper </ui-stepper>
    <ui-modal v-model="show" title="Modal title"> Modal content </ui-modal>
    <ui-notifications-container :options="notifications" />
  </div>
</template>

<script>
export default /*#__PURE__*/ {
  name: "Activity", // vue component name
  data() {
    return {
      value: null,
      tab: 1,
      step: 5,
      show: true,
      notifications: [
        { text: "Test", close: "manual", closeLabel: "Close it" },
      ],
    };
  },
  components: {
    "ui-app": ui.uiApp,
    "ui-input-calendar": ui.uiInputCalendar,
    "ui-tab": ui.uiTab,
    "ui-tabs": ui.uiTabs,
    "ui-stepper": ui.uiStepper,
    "ui-modal": ui.uiModal,
    "ui-notifications-container": ui.uiNotificationContainer,
  },
};
</script>

