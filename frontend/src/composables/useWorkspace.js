import { computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "../../target/idl/personal_journaling.json";

const clusterUrl = process.env.VUE_APP_CLUSTER_URL;
const preflightCommitment = "processed";
const commitment = "processed";
const programID = new PublicKey('GQdZb18RvtuSqoSJ9tE4GRBwjWRMXoMCRumCNc4ZFLC1');
let workspace = null;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(clusterUrl, commitment);
  const provider = computed(
    () =>
      new AnchorProvider(connection, wallet.value, {
        preflightCommitment,
        commitment,
      })
  );
  const program = computed(() => new Program(idl, programID, provider.value));

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
