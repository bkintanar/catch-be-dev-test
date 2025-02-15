<template>
  <div class="px-4 py-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Customers</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the customers in the database their name, title, email, company.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th @click="sortBy('last_name')" scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
              <th @click="sortBy('title')" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
              <th @click="sortBy('company')" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
              <th @click="sortBy('email')" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.email">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ customer.last_name }}, {{ customer.first_name }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.title }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.company }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.email }}</td>
            </tr>
            </tbody>
          </table>

        </div>
        <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
          <div class="hidden sm:block">
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ meta.from }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ meta.to }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ meta.total }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div class="flex flex-1 justify-between sm:justify-end">
            <a href="#" @click="previous" class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Previous</a>
            <a href="#" @click="next" class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Next</a>
          </div>
        </nav>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useMyFetch } from '~/composables/useMyFetch'

const customers = ref([])
const meta = ref({})
const isSortAscending = ref(true)
const sortingOrder = ref('last_name')
const getCustomers = async (page, options = {}) => {

  if (!page) {
    page = 1
  }

  if (!options.sort) {
    options.sort = sortingOrder.value
  }

  return useMyFetch('/customers', {params: {page, ...options}})
      .then(response => response)
}

async function previous() {
  getCustomers(meta.value.current_page-1).then(response => setData(response))
}
async function next() {
  getCustomers(meta.value.current_page+1).then(response => setData(response))
}

async function sortBy(column) {

  if (isSortAscending.value) {
    isSortAscending.value = false

    sortingOrder.value = '-'+column
  } else {
    isSortAscending["value"] = true
    sortingOrder.value = column
  }

  getCustomers(meta.value.current_page, {sort: sortingOrder.value}).then(response => setData(response))
}

function setData(response) {
  const {data, ...subset} = response

  meta.value = subset

  customers.value = response.data
}

onMounted(async () => {
  getCustomers().then(response => setData(response))
})
</script>