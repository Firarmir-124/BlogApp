<script lang="ts">

</script>

<template>
  <h2 class="my-3">Создать блог</h2>
  <form>
    <div class="card p-2">
      <div class="form-group">
        <label class="mb-3" for="name">Название блога</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Введите название...">
      </div>
      <div class="form-group my-3">
        <label class="mb-3" for="text">Информация</label>
        <textarea class="form-control" id="text" name="text" rows="3" placeholder="Введите информацию о блоге..."></textarea>
      </div>
      <div class="form-group">
        <label class="mb-3" for="nameAuthor">Автор блога</label>
        <input type="text" class="form-control" id="nameAuthor" name="nameAuthor" placeholder="Введите имя...">
      </div>
      <button type="submit" class="btn btn-primary mt-3 w-25">Создать</button>
    </div>
  </form>
</template>

<style>

</style>
