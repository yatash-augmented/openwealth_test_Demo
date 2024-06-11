<template>
<p>hi</p>
</template>

<script>

import { onMounted } from 'vue';
export default {

mounted() {
 console.log('key up')
    console.log("setTransactionTypes",this.$fetchCinchyQuery("getOrder"))
}



}
</script>
