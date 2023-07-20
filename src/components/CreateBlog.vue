<script lang="ts">

</script>

<template>
  <form>
    <div class="form-group">
      <label class="mb-2" for="name">Название блога</label>
      <input type="text" class="form-control" id="name" name="name" placeholder="Введите название...">
    </div>
    <div class="form-group my-2">
      <label class="mb-2" for="text">Информация</label>
      <textarea class="form-control" id="text" name="text" rows="3" placeholder="Введите информацию о блоге..."></textarea>
    </div>
    <div class="form-group">
      <label class="mb-2" for="nameAuthor">Автор блога</label>
      <input type="text" class="form-control" id="nameAuthor" name="nameAuthor" placeholder="Введите имя...">
    </div>
    <button type="submit" class="btn btn-primary mt-3">Создать</button>
  </form>
</template>

<style>

</style>
