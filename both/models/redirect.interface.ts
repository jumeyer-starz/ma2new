export interface Redirect {
  _id?: string;
  name: string;
  description: string;
  redirect: string;

  owner?: string;
  testEnabled?: boolean;
  prodEnabled?: boolean;
  invited?: string[];
  urlTests?: UrlTest[];
}



interface UrlTest {
  userId: string;
  response: string;
  lastRun: string;
  expect:boolean;
  lastStatus:boolean;
}

