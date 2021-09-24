<template>
  <div class="lib-card">
    <section v-if="errored">
      <p>We're sorry, an error occurred when trying to access the API.  Please try again later</p>
    </section>

    <section v-else>
      <!-- Loading -->
      <b-card v-if="loading" class="mb-3">Loading...</b-card>

      <!-- Show the actual card -->
      <b-card v-else 
        no-body 
        class="overflow-hidden padded border" 
        style="width: 640px;"
        header-tag="header"
        header-bg-variant="white"
        footer-tag="footer"
      >

        <!-- Header section -->
        <template #header>
          <section v-if="mediaData.type=='BOOK'"><h4 class="header-font title-font">Would you read this?</h4></section>
          <section v-else><h4 class="header-font title-font">Would you watch this?</h4></section>
        </template>

        <!-- Card Content -->
        <b-row no-gutters align-v="center">
          <!-- Image on left -->
          <b-col md="3">
            <b-card-img 
              :src="mediaData.thumbnail" 
              alt="Media Thumbnail" 
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <!-- Text on right -->
          <b-col md="9"  class="padded align-left">
            <b-card-body >
              <!-- title -->
              <b-card-title class="title-font">
                {{ mediaData.title }}
              </b-card-title>
              <!-- author -->
              <p v-if="mediaData.type=='BOOK'" class="media-author">{{ mediaData.author}}</p>
              <!-- media type -->
              <p class="media-type title-font">
                <b-icon v-if="mediaData.type=='BOOK'" icon="book-fill"></b-icon> 
                <b-icon v-else icon="film"></b-icon> 
                {{ mediaData.type }}
              </p>
              <!-- description -->
              <b-card-text>
                {{ mediaData.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>

        <!-- Buttons on bottom -->
        <b-row no-gutters align-v="center" class="mb-2">
          <b-col></b-col>
          <!-- No Button -->
          <b-col md="3">
            <b-button block variant="danger" @click="ButtonPressed($event, false)">
            <b-icon icon="x"></b-icon> No
            </b-button>
          </b-col>
          <b-col md="1"></b-col>
          <!-- Yes Button -->
          <b-col md="3">
            <b-button block variant="success" @click="ButtonPressed($event, true)">
              <b-icon icon="check2"></b-icon> Yes
            </b-button>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-card>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RecommendCard',
  props: {
  },
  data: function() {
      return {
        mediaData: "",
        loading: true,
        errored: false
      }
  },
  mounted () {
    // Upon component load get a new item
    axios
      .get('https://api.lib.byu.edu/leaflet/item')
      .then(response => {
        this.mediaData = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  methods : {
    /** ButtonPressed triggers upon pressing the Yes or No buttons
     * POSTs to API with needed data (user id, item id, t/f consume media)
     * Then informs parent of completion with card ($emit)
     */
      ButtonPressed(event, dat) {
        let self = this;

        var data = JSON.stringify({
          itemId: this.mediaData.id,
          rating: dat
        });

        var config = {
          method: 'post',
          url: 'https://api.lib.byu.edu/leaflet/users/Carson123/ratings',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          self.$emit('clicked', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

     }
  }
}
</script>

<!-- Fancy styling for fancy apps -->
<style scoped>
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
  .border-3 {
    border-width: 5px !important;
    border-color: #4b4d4e;
  }
  .header-font {
    color: #778189;
  }
  .media-description {
    font-size: 10px;
  }
  .media-author {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color:dimgrey;
    font-size: 14px;
  }
  .media-type {
    color: mediumaquamarine;
    font-size: 14px;
  }
  .padded {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 0px;
    padding-bottom: 12px;
  }
</style>
