import {environment} from '../../../environments/environment';

interface Schema {
  protocol: string;
  host: string;
  port?: string;
  context?: string;
}

export abstract class AbstractRestService {

  protected constructor() {
  }

  get apiURL(): string {
    return AbstractRestService.getUrl(environment.API_SCHEMA);
  }


  private static getUrl(schema: Schema): string {
    const protocol = (schema.protocol ? schema.protocol : '').replace(/:$/, '');
    const host = schema.host ? schema.host : window.location.hostname;
    const port = (!schema.port) ? '' : (':' + schema.port);
    let context = schema.context ? schema.context : '';

    if (context.trim() !== '' && !context.startsWith('/')) {
      context = `/${context}`;
    }

    return (host ? protocol + '://' + host + port : '') + context;
  }
}
