import { CexRepository } from "@repository/cex.repository";
import { CommunityRepository } from "@repository/community.repository";
import { CryptoRepository } from "@repository/crypto.repository";
import { DexRepository } from "@repository/dex.repository";
import { MetricRepository } from "@repository/metric.repository";
import { MiscRepository } from "@repository/misc.repository";
import { Client } from "@core/client";

export class CoinMarketCapApi {
  public client = new Client();

  public crypto = new CryptoRepository(this);
  public dex = new DexRepository(this);
  public cex = new CexRepository(this);
  public metric = new MetricRepository(this);
  public community = new CommunityRepository(this);
  public misc = new MiscRepository(this);

  constructor(apikey?: string) {
    if (apikey) this.client.setApiKey(apikey);
  }

  public sandbox(): CoinMarketCapApi {
    this.client = this.client.sandbox();
    return this;
  }

  public static sandbox(): CoinMarketCapApi {
    const instance = new CoinMarketCapApi();
    instance.client = instance.client.sandbox();
    return instance;
  }
}
