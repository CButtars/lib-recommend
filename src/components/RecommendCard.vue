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
        class="overflow-hidden padded" 
        style="width: 640px;"
        header-tag="header"
        footer-tag="footer"
      >

        <!-- Header section -->
        <template #header>
          <section v-if="mediaData.type=='BOOK'"><h1>Would you read this?</h1></section>
          <section v-else><h1>Would you watch this?</h1></section>
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
            <b-card-body :title="mediaData.title">
              <p v-if="mediaData.type=='BOOK'" class="media-author">{{ mediaData.author}}</p>
              <p class="media-type">
                <b-icon v-if="mediaData.type=='BOOK'" icon="book-fill"></b-icon> 
                <b-icon v-else icon="film"></b-icon> 
                {{ mediaData.type }}
              </p>
              <b-card-text>
                {{ mediaData.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>

        <!-- Buttons on bottom -->
        <b-row no-gutters align-v="center">
          <b-col></b-col>
          <b-col md="3">
            <b-button block variant="danger" @click="ButtonPressed($event, false)">
            <b-icon icon="x"></b-icon> No
            </b-button>
          </b-col>
          <b-col md="1"></b-col>
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
import leaflet from '../services/api/leaflet.js'
import axios from 'axios'

export default {
  name: 'RecommendCard',
  props: {
  },
  data: function() {
      return {
        mediaData: "This is just some test text",
        test: "empty",
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
          console.log(JSON.stringify(response.data));
          self.$emit('clicked', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.padded {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 0px;
  padding-bottom: 12px;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.media-description {
  font-size: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
