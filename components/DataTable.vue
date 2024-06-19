<template>
  <div>
    <h1>Advisor Master</h1>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.id" >{{header.columnName}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <!-- <td>{{ item.systemId }}</td> -->
          <td>{{ item.tokenId }}</td>
          <td>{{ item.dealer }}</td>
            <td>{{ item.dealerCode }}</td>
            <td>{{ item.fullName }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.title }}</td>
            <td>{{ item.systemId }}</td>
          <td>{{ item.created }}</td>
          <td>{{ item.createdBy }}</td>
          <td>{{ item.modified }}</td>
           <td>{{ item.version }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    headers:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
