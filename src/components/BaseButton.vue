/<template>
  <div class="m-btn-container">
      <button :disabled="isReadyData != null && !isReadyData"  :tabindex="tabindex"   @click="$emit('click')" :id="id" :class="[classList]" :style="{backgroundImage: (hasIcon ? 'url(' + require('@/assets/icon/'+urlIcon) + ')': '')
      ,
      backgroundColor : bgColor,
      color : textColor,
      }" >
            <div class="btn-name">{{btnText}}</div>
      </button>
  </div>
  
</template>

<script>
export default {
    props: ['hasIcon', 'urlIcon','bgColor','classList','btnText','id','textColor','tabindex','isReadyData'],
    data(){
        return{
            
        }
    }
}
</script>

<style scoped>
    
    
</style>
