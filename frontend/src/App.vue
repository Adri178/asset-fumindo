<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API = 'http://localhost:3000/asset';
const assets = ref([]);
const editId = ref(null);
const empty = () => ({ asset_name: '', stock_quantity: 0, category: 'Consumable' });
const form = ref(empty());

async function loadData() {
  assets.value = (await axios.get(API)).data;
}

async function run(action) {
  try {
    if (action) await action();
    await loadData();
  } catch (e) {
    alert(e.response?.data?.message || e.message);
  }
}

function resetForm() {
  editId.value = null;
  form.value = empty();
}

function editData(item) {
  editId.value = item.asset_id;
  form.value = {
    asset_name: item.asset_name,
    stock_quantity: item.stock_quantity,
    category: item.category,
  };
}

function saveData() {
  run(async () => {
    if (editId.value === null) {
      await axios.post(API, form.value);
    } else {
      await axios.patch(`${API}/${editId.value}`, form.value);
    }
    resetForm();
  });
}

function deleteData(id) {
  if (confirm('Hapus asset ini?')) {
    run(async () => {
      await axios.delete(`${API}/${id}`);
      if (editId.value === id) resetForm();
    });
  }
}

onMounted(() => run());
</script>

<template>
  <h1>Manajemen Asset Fumindo</h1>
  <h2>{{ editId === null ? 'Tambah Asset' : 'Edit Asset' }}</h2>

  <form @submit.prevent="saveData">
    <label>Nama
      <input v-model.trim="form.asset_name" maxlength="100" required />
    </label><br />
    <label>Stok
      <input v-model.number="form.stock_quantity" type="number"
             min="0" max="2147483647" step="1" required />
    </label><br />
    <label>Kategori
      <select v-model="form.category">
        <option>Consumable</option>
        <option>Non-Consumable</option>
      </select>
    </label><br />
    <button type="submit">Simpan</button>
    <button type="button" @click="resetForm">Batal</button>
  </form>

  <table>
    <thead>
      <tr><th>ID</th><th>Nama</th><th>Stok</th><th>Kategori</th><th>Aksi</th></tr>
    </thead>
    <tbody>
      <tr v-for="asset in assets" :key="asset.asset_id">
        <td>{{ asset.asset_id }}</td>
        <td>{{ asset.asset_name }}</td>
        <td>{{ asset.stock_quantity }}</td>
        <td>{{ asset.category }}</td>
        <td>
          <button @click="editData(asset)">Edit</button>
          <button @click="deleteData(asset.asset_id)">Hapus</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>