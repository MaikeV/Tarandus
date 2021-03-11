<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <NavbarItem linkto="/" title="Dashboard">
                    <v-icon>mdi-view-dashboard</v-icon>
                </NavbarItem>
                <NavbarItem linkto="/settings" title="Settings">
                    <v-icon>mdi-tools</v-icon>
                </NavbarItem>
                <NavbarItem linkto="/legal" title="Impressum">
                    <v-icon>mdi-briefcase</v-icon>
                </NavbarItem>
                <NavbarItem linkto="/privacy" title="Datenschutz">
                    <v-icon>mdi-security</v-icon>
                </NavbarItem>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left class="blue-darken-4">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Tarandus</v-toolbar-title>
        </v-app-bar>
        <v-container class="content" fluid>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card class="flex">
                        <slot></slot>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import NavbarItem from "./NavbarItem";
    import colors from 'vuetify/lib/util/colors'

    export default {
        name: "Layout",
        components: {
            NavbarItem

        },
        data: () => ({
            cards: [{title: 'test'}],
            drawer: null
        }),
        created() {
            this.$vuetify.theme.themes.dark.primary = colors.blue.darken4;
            this.$vuetify.theme.dark = true
        }
    }
</script>

<style scoped>
    .content {
        margin-top: 60px;
    }

    .flex{
        display: flex;
        justify-content: center;
    }
</style>