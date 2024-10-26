<script setup>
import FileUpload from 'primevue/fileupload';
</script>

<template>
  <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="" :maxFileSize="1000000">
    <template #empty>
      <span>Drag and drop files to here to upload.</span>
    </template>
    <template #>

    </template>
  </FileUpload>
</template>

<style scoped>

</style>
