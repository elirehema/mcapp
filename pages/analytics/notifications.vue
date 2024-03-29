<template>
  <v-card flat tile>
    <v-toolbar color="primary" flat dark>
      <v-toolbar-title class="text-h5 font-weight-black">
        <v-icon color="button" left>mdi-bell-ring</v-icon>
        MEMBER/GROUP NOTIFICATION
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-row no-gutters class="px-3">
        <v-col cols="12" sm="12">
          <v-combobox
            v-model="model"
            :items="items"
            :search-input.sync="search"
            hide-selected
            prepend-icon="mdi-dialpad"
            hint="Members MSISDN's"
            label="Recipients MSISDN"
            multiple
            persistent-hint
            small-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Press <kbd>enter</kbd> to
                    create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
       
        <v-col cols="12" sm="12" class="mt-5">
          <v-textarea
            outlined
            name="input-7-4"
            hint="Input message detail"
            label="Message"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
        <v-spacer/>
        <v-btn color="button darken-2">
            <v-icon small left>mdi-send</v-icon>Send Message</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [],
    model: [],
    search: null,
  }),
  /** 
    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
    },
    **/
};
</script>