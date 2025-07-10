<template>
  <div class="px-4 py-2">
    <slot>
      <!-- Default slot content can be provided by parent -->
    </slot>
    <div v-if="items.length === 0">
      <slot name="empty">
        <p>Không có mặt hàng nào trong danh sách.</p>
      </slot>
    </div>
    <div v-else>
      <AppItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="$emit('toggle', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script>
import AppItem from './Item.vue'

export default {
  name: 'ItemList',
  components: {
    AppItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle', 'edit', 'delete']
}
</script>


