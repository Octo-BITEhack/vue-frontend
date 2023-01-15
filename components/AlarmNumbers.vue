<template>
  <div
    :class="`inline-flex items-center justify-between w-full rounded-2xl py-4 px-8 text-3xl lg:w-80 lg:rounded-xl lg:p-2 lg:text-2xl`"
  >
    <div>
      <a :href="`tel:+${mobile}`">{{ mobile }}<i class="fas fa-mobile"></i></a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AlarmNumbers',
  props: {
    mobile: {
      type: String,
      required: true
    }
  }
}
</script>
