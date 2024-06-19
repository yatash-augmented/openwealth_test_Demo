<template>
  <div>
    <DataTable :items="users" :headers="headers" />
  </div>
</template>

<script>

import { onMounted } from 'vue';
import DataTable from '@/components/DataTable.vue';
export default {
components: {
    DataTable
  },
  data() {
    return {
      headers:[],
      users: []
    };
  },
async mounted() {

const getadvisor_data=await this.$fetchCinchyQuery("getAdvisors")
      this.users=getadvisor_data
      this.headers=getadvisor_data.schema
      console.log('users',this.users)
}



}
</script>
