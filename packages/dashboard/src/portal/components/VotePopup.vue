<template v-if="nodes">
  <v-dialog v-model="openProposalDialog" persistent max-width="350">
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark dense elevation="4" outlined rounded>Vote now!</v-toolbar>
        <div class="d-flex align-center">
          <v-card-text>
            <div class="text-subtitle-1 text-center">{{ voteMsg }}</div>
          </v-card-text>
        </div>
        <v-card-actions class="justify-space-around">
          <v-btn text @click="dialog.value = false">Close</v-btn>
          <v-btn text @click="daoRedirect">Vote</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { ApiPromise } from "@polkadot/api";
import { Component, Vue } from "vue-property-decorator";

import { IFarm, INode } from "../../explorer/graphql/api";
import config from "../config";
import { getFarm } from "../lib/farms";

@Component({
  name: "VotePopup",
})
export default class VotePopup extends Vue {
  openProposalDialog = false;
  proposals = 0;
  voteMsg = "You have a pending proposal to vote!";
  $api!: ApiPromise;
  farms: IFarm[] = [];
  farmsIds: number[] = [];
  nodes: INode[] | undefined;
  private __destroyed = false;

  async mounted() {
    this.farms = await getFarm(this.$api, this.$store.state.credentials.twin.id);
    if (this.farms.length === 0) return;
    this.farmsIds = this.farms?.map((farm: IFarm) => +farm.id);
    this.nodes = await this.getFarmsNodes(this.farmsIds);

    await this.$store.dispatch("portal/getProposal", this.$store.state.credentials.twin.id);

    this.proposals = this.$store.state.portal.proposals;

    if (!this.proposals || this.__destroyed) return;

    this.voteMsg =
      this.proposals > 1
        ? `You have ${this.proposals} pending proposals to vote!`
        : `You have a pending proposal to vote!`;
    this.openProposalDialog = true;
  }

  async getFarmsNodes(farmIDs: number[]): Promise<INode[]> {
    const url = `${config.gridproxyUrl}/nodes?status=up&ret_count=true&page=1&size=10&farm_ids=${farmIDs}`;
    const res = await fetch(url);
    const nodes = await res.json();
    return nodes;
  }

  daoRedirect() {
    this.openProposalDialog = false;
    this.$router.push({
      path: "account-dao",
    });
  }

  destroyed() {
    this.__destroyed = true;
  }
}
</script>
