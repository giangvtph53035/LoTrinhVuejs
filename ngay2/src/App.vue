<template>
  <div id="app" class="max-w-lg mx-auto mt-16 font-sans">
    <Navbar @add-new-item="onAddItem" />
    <FilterTabs
      :activeFilter="filter"
      @change-filter="onChangeFilter"
      class="mb-6"
    />
    <div class="bg-white shadow-md rounded-lg p-6">
      <keep-alive>
        <component
          :is="currentView"
          :items="filteredItems"
          :initialData="editingItem"
          @submit="onSubmit"
          @toggle="onToggle"
          @edit="onEdit"
          @delete="onDelete"
          class="px-4"
        >
          <template #default>
            <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Danh sách mua sắm</h2>
          </template>
          <template #empty>
            <p class="text-gray-500 text-center">Không có mặt hàng trong danh sách.</p>
          </template>
        </component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ItemList from './components/ItemList.vue'
import ItemForm from './components/ItemForm.vue'
import FilterTabs from './components/FilterTabs.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    ItemList,
    ItemForm,
    FilterTabs,
    Navbar
  },
  data() {
    return {
      items: [
        { id: 1, name: 'Sữa tươi', purchased: false },
        { id: 2, name: 'Bánh mì', purchased: true },
        { id: 3, name: 'Trứng gà', purchased: false }
      ],
      filter: 'all',
      currentView: 'ItemList',
      editingItem: null
    }
  },
  computed: {
    filteredItems() {
      if (this.filter === 'all') {
        return this.items
      } else if (this.filter === 'purchased') {
        return this.items.filter(item => item.purchased)
      } else if (this.filter === 'not-purchased') {
        return this.items.filter(item => !item.purchased)
      }
      return this.items
    }
  },
  watch: {
    items: {
      handler(newItems) {
        localStorage.setItem('shopping-list', JSON.stringify(newItems))
      },
      deep: true
    }
  },
  mounted() {
    const saved = localStorage.getItem('shopping-list')
    if (saved) {
      this.items = JSON.parse(saved)
    }
  },
  methods: {
    onChangeFilter(newFilter) {
      this.filter = newFilter
    },
    onAddItem() {
      this.editingItem = null
      this.currentView = 'ItemForm'
    },
    onSubmit(item) {
      if (this.editingItem) {
        // Cập nhật mặt hàng
        const index = this.items.findIndex(i => i.id === this.editingItem.id)
        if (index !== -1) {
          this.items.splice(index, 1, { ...item, id: this.editingItem.id })
        }
        this.editingItem = null
      } else {
        // Thêm mặt hàng mới
        const newItem = { ...item, id: Date.now(), purchased: false }
        this.items.push(newItem)
      }
      this.currentView = 'ItemList'
    },
    onToggle(id) {
      const index = this.items.findIndex(i => i.id === id)
      if (index !== -1) {
        this.items[index].purchased = !this.items[index].purchased
      }
    },
    onEdit(item) {
      this.editingItem = { ...item }
      this.currentView = 'ItemForm'
    },
    onDelete(id) {
      this.items = this.items.filter(i => i.id !== id)
    }
  }
}
</script>


