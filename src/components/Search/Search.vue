<template>
    <div>
    
    <div class="col-12-12">
        <div>
        <input 
            type="text" 
            v-model="searchText" 
            title="Search for products and more" 
            name="q" 
            autocomplete="off" 
            placeholder="Search for products, brands and more"
            @input="handleSearch"
        />
        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search" style="color:#2874f0;"></i></button>
        </div>
    </div>
    
    <div id="myDropdown" class="dropdown-content">
        <ul v-for="res in filterRec" id="search-ul">
            <a tag="li" @click="searchRedirect(res.product_id)" id="li-css">
                <p>
                    <i class="fa fa-search" aria-hidden="true"></i>&nbsp;
                    {{ res.product_name }}
                    <br/>
                    <font style="color: blue; font-size: 12px;">{{ res.brand_name }}</font>
                </p>
            </a>
        </ul>
        
    </div>
    </div>
</template>

<script>
export default {
    name: 'Search',

    data () {
        return {
            searchText: ''
        }
    },

    computed: {
        
        filterRec() {
            return this.productsSearch.filter((product) => {
                
                if(this.searchText.length > 2) {
                    return product.product_name.match(new RegExp(`${this.searchText}`,'gi'));
                }                
            });            
        },
        productsSearch() {
            return this.$store.state.HomeStore.searchProducts;
        }
    },

    created () {
        this.$store.dispatch("searchProducts");
    },

    methods: {
        handleSearch () {
            //this.$store.dispatch('search', this.searchText);
            //console.log('Hello', this.searchText);
            //console.log(event.target.value);
        },
        searchRedirect (pid) {
            console.log(pid);
            this.$router.push({name: 'Product_Details', params: { id: pid }});
        }
    }
}
</script>

<style scoped>
    input {
        float: left;
        height: 36px;
        width: 40%;
        margin-top: 10px;
        font-family: Roboto,Arial,sans-serif;
        letter-spacing: 0;
        padding: 0 16px;
    }

    button {
        float: left;
        height: 36px;
        margin-top: 11px;
    }

    #myDropdown {
        /* position: absolute;
        width: 70%;
        background-color: bisque;
        z-index: 2;
        height: 500px;
        margin-top: 6px;
        color: midnightblue;
        margin-left: 11px; */

        border-radius: 0 0 2px 2px;
        border-top: 1px solid #e0e0e0;
        position: absolute;
        background-color: #fff;
        color: #000;
        z-index: 9;
        top: 45px;
        display: block;
        box-shadow: 2px 3px 5px -1px rgba(0,0,0,.5);
        overflow: hidden; 
        white-space: nowrap;
        width: 40%; 
        margin-left: 110px;
    }

    #search-ul  {
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 15px;
    }

    #li-css {
        padding: 8px;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-justify-content: left;
        -ms-flex-pack: left;
        justify-content: left;
        font-size: 14px;
        color: #A9A9A9;
        font-weight: 700;
        
    }
</style>

