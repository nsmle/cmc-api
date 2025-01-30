import { Client } from "@core/client";
import { CexRepository } from "@repository/cex.repository";
import { CommunityRepository } from "@repository/community.repository";
import { CryptoRepository } from "@repository/crypto.repository";
import { DexRepository } from "@repository/dex.repository";
import { MetricRepository } from "@repository/metric.repository";
import { MiscRepository } from "@repository/misc.repository";

export class CoinMarketCapApi {
  public client = new Client(this);

  public crypto = new CryptoRepository(this);
  public dex = new DexRepository(this);
  public cex = new CexRepository(this);
  public metric = new MetricRepository(this);
  public community = new CommunityRepository(this);
  public misc = new MiscRepository(this);
}
