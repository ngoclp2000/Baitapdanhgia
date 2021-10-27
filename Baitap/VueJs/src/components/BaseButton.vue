/<template>
  <div class="m-btn-container">
      <button :tabindex="tabindex"   @click="$emit('click')" :id="id" :class="[classList]" :style="{backgroundImage: (hasIcon ? 'url(' + require('@/assets/icon/'+urlIcon) + ')': '')
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
    props :{
        hasIcon : String,
        urlIcon : String,
        bgColor : String,
        classList : String,
        btnText : String,
        id : String,
        textColor : String,
        tabindex: String,
    },
    data(){
        return{
            
        }
    }
}
</script>

<style scoped>
    
    
</style>
