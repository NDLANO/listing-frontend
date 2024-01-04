export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  StringRecord: any;
};

export type GQLAggregationResult = {
  __typename?: "AggregationResult";
  docCountErrorUpperBound: Scalars["Int"];
  field: Scalars["String"];
  sumOtherDocCount: Scalars["Int"];
  values: Array<GQLBucketResult>;
};

export type GQLArticle = {
  __typename?: "Article";
  articleType: Scalars["String"];
  availability?: Maybe<Scalars["String"]>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  conceptIds?: Maybe<Array<Scalars["Int"]>>;
  concepts?: Maybe<Array<GQLConcept>>;
  content: Scalars["String"];
  copyright: GQLCopyright;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  created: Scalars["String"];
  crossSubjectTopics?: Maybe<Array<GQLCrossSubjectElement>>;
  grepCodes?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  metaData?: Maybe<GQLArticleMetaData>;
  metaDescription: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  oembed?: Maybe<Scalars["String"]>;
  oldNdlaUrl?: Maybe<Scalars["String"]>;
  published: Scalars["String"];
  relatedContent?: Maybe<Array<GQLRelatedContent>>;
  requiredLibraries?: Maybe<Array<GQLArticleRequiredLibrary>>;
  revision: Scalars["Int"];
  revisionDate?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  supportedLanguages?: Maybe<Array<Scalars["String"]>>;
  tags?: Maybe<Array<Scalars["String"]>>;
  title: Scalars["String"];
  updated: Scalars["String"];
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLArticleCrossSubjectTopicsArgs = {
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLArticleFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "ArticleFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLArticleMetaData = {
  __typename?: "ArticleMetaData";
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  copyText?: Maybe<Scalars["String"]>;
  footnotes?: Maybe<Array<GQLFootNote>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
};

export type GQLArticleRequiredLibrary = {
  __typename?: "ArticleRequiredLibrary";
  mediaType: Scalars["String"];
  name: Scalars["String"];
  url: Scalars["String"];
};

export type GQLArticleSearchResult = GQLSearchResult & {
  __typename?: "ArticleSearchResult";
  contexts: Array<GQLSearchContext>;
  id: Scalars["Int"];
  metaDescription: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars["String"]>;
  title: Scalars["String"];
  traits: Array<Scalars["String"]>;
  url: Scalars["String"];
};

export type GQLAudio = {
  __typename?: "Audio";
  audioFile: GQLAudioFile;
  audioType: Scalars["String"];
  copyright: GQLCopyright;
  created: Scalars["String"];
  id: Scalars["Int"];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  revision: Scalars["Int"];
  series?: Maybe<GQLPodcastSeries>;
  supportedLanguages: Array<Scalars["String"]>;
  tags: GQLTags;
  title: GQLTitle;
  updated: Scalars["String"];
};

export type GQLAudioFile = {
  __typename?: "AudioFile";
  fileSize: Scalars["Int"];
  language: Scalars["String"];
  mimeType: Scalars["String"];
  url: Scalars["String"];
};

export type GQLAudioFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "AudioFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLAudioLicense = {
  __typename?: "AudioLicense";
  copyText?: Maybe<Scalars["String"]>;
  copyright: GQLCopyright;
  id: Scalars["String"];
  src: Scalars["String"];
  title: Scalars["String"];
};

export type GQLAudioSearch = {
  __typename?: "AudioSearch";
  language: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize: Scalars["Int"];
  results: Array<GQLAudioSummary>;
  totalCount: Scalars["Int"];
};

export type GQLAudioSummary = {
  __typename?: "AudioSummary";
  audioType: Scalars["String"];
  id: Scalars["Int"];
  lastUpdated: Scalars["String"];
  license: Scalars["String"];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  supportedLanguages: Array<Scalars["String"]>;
  title: GQLTitle;
  url: Scalars["String"];
};

export type GQLBreadcrumb = {
  __typename?: "Breadcrumb";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type GQLBrightcoveCustomFields = {
  __typename?: "BrightcoveCustomFields";
  accountId?: Maybe<Scalars["String"]>;
  license: Scalars["String"];
  licenseInfo: Array<Scalars["String"]>;
};

export type GQLBrightcoveElement = {
  __typename?: "BrightcoveElement";
  account?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  cover?: Maybe<Scalars["String"]>;
  customFields?: Maybe<GQLBrightcoveCustomFields>;
  description?: Maybe<Scalars["String"]>;
  download?: Maybe<Scalars["String"]>;
  iframe?: Maybe<GQLBrightcoveIframe>;
  name?: Maybe<Scalars["String"]>;
  player?: Maybe<Scalars["String"]>;
  src?: Maybe<Scalars["String"]>;
  uploadDate?: Maybe<Scalars["String"]>;
  videoid?: Maybe<Scalars["String"]>;
};

export type GQLBrightcoveIframe = {
  __typename?: "BrightcoveIframe";
  height: Scalars["Int"];
  src: Scalars["String"];
  width: Scalars["Int"];
};

export type GQLBrightcoveLicense = {
  __typename?: "BrightcoveLicense";
  copyright?: Maybe<GQLCopyright>;
  cover?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  download?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  iframe?: Maybe<GQLBrightcoveIframe>;
  src?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  uploadDate?: Maybe<Scalars["String"]>;
};

export type GQLBucketResult = {
  __typename?: "BucketResult";
  count: Scalars["Int"];
  value: Scalars["String"];
};

export type GQLCaption = {
  __typename?: "Caption";
  caption: Scalars["String"];
  language: Scalars["String"];
};

export type GQLCompetenceGoal = {
  __typename?: "CompetenceGoal";
  code?: Maybe<Scalars["String"]>;
  competenceGoalSet?: Maybe<GQLReference>;
  competenceGoalSetCode?: Maybe<Scalars["String"]>;
  coreElements?: Maybe<Array<GQLElement>>;
  coreElementsCodes?: Maybe<Array<GQLElement>>;
  crossSubjectTopics?: Maybe<Array<GQLElement>>;
  crossSubjectTopicsCodes?: Maybe<Array<GQLElement>>;
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars["String"]>;
  curriculumId?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  language?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLConcept = {
  __typename?: "Concept";
  articleIds: Array<Scalars["Int"]>;
  articles?: Maybe<Array<GQLMeta>>;
  content: Scalars["String"];
  copyright?: Maybe<GQLConceptCopyright>;
  created: Scalars["String"];
  id: Scalars["Int"];
  image?: Maybe<GQLImageLicense>;
  metaImage?: Maybe<GQLMetaImage>;
  source?: Maybe<Scalars["String"]>;
  subjectIds?: Maybe<Array<Scalars["String"]>>;
  subjectNames?: Maybe<Array<Scalars["String"]>>;
  supportedLanguages: Array<Scalars["String"]>;
  tags: Array<Scalars["String"]>;
  title: Scalars["String"];
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLConceptCopyright = {
  __typename?: "ConceptCopyright";
  creators: Array<GQLContributor>;
  license?: Maybe<GQLLicense>;
  origin?: Maybe<Scalars["String"]>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLConceptFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "ConceptFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLConceptLicense = {
  __typename?: "ConceptLicense";
  content?: Maybe<Scalars["String"]>;
  copyright?: Maybe<GQLConceptCopyright>;
  id: Scalars["String"];
  metaImageUrl?: Maybe<Scalars["String"]>;
  src?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type GQLConceptResult = {
  __typename?: "ConceptResult";
  concepts: Array<GQLConcept>;
  language: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize: Scalars["Int"];
  totalCount: Scalars["Int"];
};

export type GQLConfigMetaRestricted = {
  __typename?: "ConfigMetaRestricted";
  key: Scalars["String"];
  value: Scalars["String"];
};

export type GQLContributor = {
  __typename?: "Contributor";
  name: Scalars["String"];
  type: Scalars["String"];
};

export type GQLCopyright = {
  __typename?: "Copyright";
  creators: Array<GQLContributor>;
  license: GQLLicense;
  origin?: Maybe<Scalars["String"]>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLCoreElement = {
  __typename?: "CoreElement";
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  language?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type GQLCoverPhoto = {
  __typename?: "CoverPhoto";
  altText: Scalars["String"];
  id: Scalars["String"];
  url: Scalars["String"];
};

export type GQLCrossSubjectElement = {
  __typename?: "CrossSubjectElement";
  code?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type GQLDescription = {
  __typename?: "Description";
  description: Scalars["String"];
  language: Scalars["String"];
};

export type GQLEditorNote = {
  __typename?: "EditorNote";
  note: Scalars["String"];
  timestamp: Scalars["String"];
  updatedBy: Scalars["String"];
};

export type GQLElement = {
  __typename?: "Element";
  explanation: Array<Maybe<Scalars["String"]>>;
  reference: GQLReference;
};

export type GQLEmbedVisualelement = {
  __typename?: "EmbedVisualelement";
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLFilmFrontpage = {
  __typename?: "FilmFrontpage";
  about: Array<GQLFilmPageAbout>;
  movieThemes: Array<GQLMovieTheme>;
  name: Scalars["String"];
  slideShow: Array<GQLMovie>;
};

export type GQLFilmPageAbout = {
  __typename?: "FilmPageAbout";
  description: Scalars["String"];
  language: Scalars["String"];
  title: Scalars["String"];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLFolder = {
  __typename?: "Folder";
  breadcrumbs: Array<GQLBreadcrumb>;
  created: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name: Scalars["String"];
  parentId?: Maybe<Scalars["String"]>;
  resources: Array<GQLFolderResource>;
  status: Scalars["String"];
  subfolders: Array<GQLFolder>;
  updated: Scalars["String"];
};

export type GQLFolderResource = {
  __typename?: "FolderResource";
  created: Scalars["String"];
  id: Scalars["String"];
  path: Scalars["String"];
  resourceId: Scalars["String"];
  resourceType: Scalars["String"];
  tags: Array<Scalars["String"]>;
};

export type GQLFolderResourceMeta = {
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLFolderResourceMetaSearchInput = {
  id: Scalars["String"];
  path: Scalars["String"];
  resourceType: Scalars["String"];
};

export type GQLFolderResourceResourceType = {
  __typename?: "FolderResourceResourceType";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type GQLFootNote = {
  __typename?: "FootNote";
  authors: Array<Scalars["String"]>;
  edition?: Maybe<Scalars["String"]>;
  publisher?: Maybe<Scalars["String"]>;
  ref: Scalars["Int"];
  title: Scalars["String"];
  url?: Maybe<Scalars["String"]>;
  year: Scalars["String"];
};

export type GQLFrontPageResources = {
  __typename?: "FrontPageResources";
  results: Array<GQLFrontpageSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars["Int"];
};

export type GQLFrontpage = {
  __typename?: "Frontpage";
  article?: Maybe<GQLArticle>;
  menu: Array<Maybe<GQLMenu>>;
};

export type GQLFrontpageSearch = {
  __typename?: "FrontpageSearch";
  learningResources: GQLFrontPageResources;
  topicResources: GQLFrontPageResources;
};

export type GQLFrontpageSearchResult = {
  __typename?: "FrontpageSearchResult";
  id: Scalars["String"];
  name: Scalars["String"];
  path: Scalars["String"];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  subject: Scalars["String"];
};

export type GQLGroupSearch = {
  __typename?: "GroupSearch";
  aggregations: Array<GQLAggregationResult>;
  language: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize: Scalars["Int"];
  resourceType: Scalars["String"];
  resources: Array<GQLGroupSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars["Int"];
};

export type GQLGroupSearchResult = {
  __typename?: "GroupSearchResult";
  contexts: Array<GQLSearchContext>;
  id: Scalars["Int"];
  ingress: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  name: Scalars["String"];
  path: Scalars["String"];
  traits: Array<Scalars["String"]>;
  url: Scalars["String"];
};

export type GQLH5pElement = {
  __typename?: "H5pElement";
  src?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type GQLH5pLicense = {
  __typename?: "H5pLicense";
  copyright?: Maybe<GQLCopyright>;
  id: Scalars["String"];
  src?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type GQLImageAltText = {
  __typename?: "ImageAltText";
  alttext: Scalars["String"];
  language: Scalars["String"];
};

export type GQLImageDimensions = {
  __typename?: "ImageDimensions";
  height: Scalars["Int"];
  width: Scalars["Int"];
};

export type GQLImageElement = {
  __typename?: "ImageElement";
  alt?: Maybe<Scalars["String"]>;
  altText: Scalars["String"];
  caption?: Maybe<Scalars["String"]>;
  contentType?: Maybe<Scalars["String"]>;
  copyText?: Maybe<Scalars["String"]>;
  focalX?: Maybe<Scalars["Float"]>;
  focalY?: Maybe<Scalars["Float"]>;
  lowerRightX?: Maybe<Scalars["Float"]>;
  lowerRightY?: Maybe<Scalars["Float"]>;
  resourceid?: Maybe<Scalars["String"]>;
  src: Scalars["String"];
  upperLeftX?: Maybe<Scalars["Float"]>;
  upperLeftY?: Maybe<Scalars["Float"]>;
};

export type GQLImageFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "ImageFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLImageLicense = {
  __typename?: "ImageLicense";
  altText: Scalars["String"];
  contentType?: Maybe<Scalars["String"]>;
  copyText?: Maybe<Scalars["String"]>;
  copyright: GQLCopyright;
  id: Scalars["String"];
  src: Scalars["String"];
  title: Scalars["String"];
};

export type GQLImageMetaInformation = {
  __typename?: "ImageMetaInformation";
  altText: Scalars["String"];
  caption: Scalars["String"];
  contentType: Scalars["String"];
  copyright: GQLCopyright;
  created: Scalars["String"];
  createdBy: Scalars["String"];
  id: Scalars["String"];
  imageUrl: Scalars["String"];
  metaUrl: Scalars["String"];
  size: Scalars["Int"];
  supportedLanguages: Array<Scalars["String"]>;
  tags: Array<Scalars["String"]>;
  title: Scalars["String"];
};

export type GQLImageMetaInformationV2 = {
  __typename?: "ImageMetaInformationV2";
  alttext: GQLImageAltText;
  caption: GQLCaption;
  contentType: Scalars["String"];
  copyright: GQLCopyright;
  created: Scalars["String"];
  createdBy: Scalars["String"];
  editorNotes?: Maybe<Array<GQLEditorNote>>;
  id: Scalars["String"];
  imageDimensions?: Maybe<GQLImageDimensions>;
  imageUrl: Scalars["String"];
  metaUrl: Scalars["String"];
  modelRelease: Scalars["String"];
  size: Scalars["Int"];
  supportedLanguages?: Maybe<Array<Scalars["String"]>>;
  tags: GQLTags;
  title: GQLTitle;
};

export type GQLLearningpath = {
  __typename?: "Learningpath";
  canEdit: Scalars["Boolean"];
  copyright: GQLLearningpathCopyright;
  coverphoto?: Maybe<GQLLearningpathCoverphoto>;
  description: Scalars["String"];
  duration?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
  isBasedOn?: Maybe<Scalars["Int"]>;
  lastUpdated: Scalars["String"];
  learningstepUrl: Scalars["String"];
  learningsteps: Array<GQLLearningpathStep>;
  metaUrl: Scalars["String"];
  revision: Scalars["Int"];
  status: Scalars["String"];
  supportedLanguages: Array<Scalars["String"]>;
  tags: Array<Scalars["String"]>;
  title: Scalars["String"];
  verificationStatus: Scalars["String"];
};

export type GQLLearningpathCopyright = {
  __typename?: "LearningpathCopyright";
  contributors: Array<GQLContributor>;
  license: GQLLicense;
};

export type GQLLearningpathCoverphoto = {
  __typename?: "LearningpathCoverphoto";
  metaUrl: Scalars["String"];
  url: Scalars["String"];
};

export type GQLLearningpathFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "LearningpathFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLLearningpathSearchResult = GQLSearchResult & {
  __typename?: "LearningpathSearchResult";
  contexts: Array<GQLSearchContext>;
  id: Scalars["Int"];
  metaDescription: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars["String"]>;
  title: Scalars["String"];
  traits: Array<Scalars["String"]>;
  url: Scalars["String"];
};

export type GQLLearningpathStep = {
  __typename?: "LearningpathStep";
  article?: Maybe<GQLArticle>;
  description?: Maybe<Scalars["String"]>;
  embedUrl?: Maybe<GQLLearningpathStepEmbedUrl>;
  id: Scalars["Int"];
  license?: Maybe<GQLLicense>;
  metaUrl: Scalars["String"];
  oembed?: Maybe<GQLLearningpathStepOembed>;
  resource?: Maybe<GQLResource>;
  revision: Scalars["Int"];
  seqNo: Scalars["Int"];
  showTitle: Scalars["Boolean"];
  status: Scalars["String"];
  supportedLanguages: Array<Scalars["String"]>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLLearningpathStepEmbedUrl = {
  __typename?: "LearningpathStepEmbedUrl";
  embedType: Scalars["String"];
  url: Scalars["String"];
};

export type GQLLearningpathStepOembed = {
  __typename?: "LearningpathStepOembed";
  height: Scalars["Int"];
  html: Scalars["String"];
  type: Scalars["String"];
  version: Scalars["String"];
  width: Scalars["Int"];
};

export type GQLLicense = {
  __typename?: "License";
  description?: Maybe<Scalars["String"]>;
  license: Scalars["String"];
  url?: Maybe<Scalars["String"]>;
};

export type GQLListingPage = {
  __typename?: "ListingPage";
  subjects?: Maybe<Array<GQLSubject>>;
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type GQLManuscript = {
  __typename?: "Manuscript";
  language: Scalars["String"];
  manuscript: Scalars["String"];
};

export type GQLMenu = {
  __typename?: "Menu";
  menu: Array<Maybe<GQLMenu>>;
  slug?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type GQLMeta = {
  __typename?: "Meta";
  availability?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  lastUpdated?: Maybe<Scalars["String"]>;
  metaDescription?: Maybe<Scalars["String"]>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars["String"];
};

export type GQLMetaImage = {
  __typename?: "MetaImage";
  alt: Scalars["String"];
  url: Scalars["String"];
};

export type GQLMovie = {
  __typename?: "Movie";
  id: Scalars["String"];
  metaDescription: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  path: Scalars["String"];
  resourceTypes: Array<GQLResourceType>;
  title: Scalars["String"];
};

export type GQLMovieMeta = {
  __typename?: "MovieMeta";
  metaDescription?: Maybe<Scalars["String"]>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars["String"];
};

export type GQLMoviePath = {
  __typename?: "MoviePath";
  path?: Maybe<Scalars["String"]>;
  paths?: Maybe<Array<Scalars["String"]>>;
};

export type GQLMovieResourceTypes = {
  __typename?: "MovieResourceTypes";
  resourceTypes?: Maybe<Array<GQLResourceType>>;
};

export type GQLMovieTheme = {
  __typename?: "MovieTheme";
  movies: Array<GQLMovie>;
  name: Array<GQLName>;
};

export type GQLMutation = {
  __typename?: "Mutation";
  addFolder: GQLFolder;
  addFolderResource: GQLFolderResource;
  deleteFolder: Scalars["String"];
  deleteFolderResource: Scalars["String"];
  deletePersonalData: Scalars["Boolean"];
  sortFolders: GQLSortResult;
  sortResources: GQLSortResult;
  transformArticleContent: Scalars["String"];
  updateFolder: GQLFolder;
  updateFolderResource: GQLFolderResource;
  updateFolderStatus: Array<Scalars["String"]>;
  updatePersonalData: GQLMyNdlaPersonalData;
};

export type GQLMutationAddFolderArgs = {
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  parentId?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type GQLMutationAddFolderResourceArgs = {
  folderId: Scalars["String"];
  path: Scalars["String"];
  resourceId: Scalars["String"];
  resourceType: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["String"]>>;
};

export type GQLMutationDeleteFolderArgs = {
  id: Scalars["String"];
};

export type GQLMutationDeleteFolderResourceArgs = {
  folderId: Scalars["String"];
  resourceId: Scalars["String"];
};

export type GQLMutationSortFoldersArgs = {
  parentId?: InputMaybe<Scalars["String"]>;
  sortedIds: Array<Scalars["String"]>;
};

export type GQLMutationSortResourcesArgs = {
  parentId: Scalars["String"];
  sortedIds: Array<Scalars["String"]>;
};

export type GQLMutationTransformArticleContentArgs = {
  absoluteUrl?: InputMaybe<Scalars["Boolean"]>;
  content: Scalars["String"];
  draftConcept?: InputMaybe<Scalars["Boolean"]>;
  previewH5p?: InputMaybe<Scalars["Boolean"]>;
  subject?: InputMaybe<Scalars["String"]>;
  visualElement?: InputMaybe<Scalars["String"]>;
};

export type GQLMutationUpdateFolderArgs = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type GQLMutationUpdateFolderResourceArgs = {
  id: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["String"]>>;
};

export type GQLMutationUpdateFolderStatusArgs = {
  folderId: Scalars["String"];
  status: Scalars["String"];
};

export type GQLMutationUpdatePersonalDataArgs = {
  favoriteSubjects: Array<Scalars["String"]>;
};

export type GQLMyNdlaPersonalData = {
  __typename?: "MyNdlaPersonalData";
  favoriteSubjects: Array<Scalars["String"]>;
  id: Scalars["Int"];
  role: Scalars["String"];
};

export type GQLName = {
  __typename?: "Name";
  language: Scalars["String"];
  name: Scalars["String"];
};

export type GQLNewFolder = {
  __typename?: "NewFolder";
  name: Scalars["String"];
  parentId?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
};

export type GQLNewFolderResource = {
  __typename?: "NewFolderResource";
  path: Scalars["String"];
  resourceType: Scalars["String"];
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type GQLPodcastLicense = {
  __typename?: "PodcastLicense";
  copyText?: Maybe<Scalars["String"]>;
  copyright: GQLCopyright;
  coverPhotoUrl?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  src: Scalars["String"];
  title: Scalars["String"];
};

export type GQLPodcastMeta = {
  __typename?: "PodcastMeta";
  image?: Maybe<GQLImageMetaInformation>;
  introduction: Scalars["String"];
  language: Scalars["String"];
};

export type GQLPodcastSeries = GQLPodcastSeriesBase & {
  __typename?: "PodcastSeries";
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  hasRSS: Scalars["Boolean"];
  id: Scalars["Int"];
  supportedLanguages: Array<Scalars["String"]>;
  title: GQLTitle;
};

export type GQLPodcastSeriesBase = {
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  hasRSS: Scalars["Boolean"];
  id: Scalars["Int"];
  supportedLanguages: Array<Scalars["String"]>;
  title: GQLTitle;
};

export type GQLPodcastSeriesSearch = {
  __typename?: "PodcastSeriesSearch";
  language: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize: Scalars["Int"];
  results: Array<GQLPodcastSeriesSummary>;
  totalCount: Scalars["Int"];
};

export type GQLPodcastSeriesSummary = {
  __typename?: "PodcastSeriesSummary";
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudioSummary>>;
  id: Scalars["Int"];
  supportedLanguages?: Maybe<Array<Scalars["String"]>>;
  title: GQLTitle;
};

export type GQLPodcastSeriesWithEpisodes = GQLPodcastSeriesBase & {
  __typename?: "PodcastSeriesWithEpisodes";
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudio>>;
  hasRSS: Scalars["Boolean"];
  id: Scalars["Int"];
  supportedLanguages: Array<Scalars["String"]>;
  title: GQLTitle;
};

export type GQLQuery = {
  __typename?: "Query";
  alerts?: Maybe<Array<Maybe<GQLUptimeAlert>>>;
  allFolderResources: Array<GQLFolderResource>;
  article?: Maybe<GQLArticle>;
  audio?: Maybe<GQLAudio>;
  competenceGoal?: Maybe<GQLCompetenceGoal>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  concept?: Maybe<GQLConcept>;
  conceptSearch?: Maybe<GQLConceptResult>;
  coreElement?: Maybe<GQLCoreElement>;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  examLockStatus: GQLConfigMetaRestricted;
  filmfrontpage?: Maybe<GQLFilmFrontpage>;
  folder: GQLFolder;
  folderResourceMeta?: Maybe<GQLFolderResourceMeta>;
  folderResourceMetaSearch: Array<GQLFolderResourceMeta>;
  folders: Array<GQLFolder>;
  frontpage?: Maybe<GQLFrontpage>;
  frontpageSearch?: Maybe<GQLFrontpageSearch>;
  groupSearch?: Maybe<Array<GQLGroupSearch>>;
  image?: Maybe<GQLImageMetaInformationV2>;
  learningpath?: Maybe<GQLLearningpath>;
  listingPage?: Maybe<GQLListingPage>;
  personalData: GQLMyNdlaPersonalData;
  podcastSearch?: Maybe<GQLAudioSearch>;
  podcastSeries?: Maybe<GQLPodcastSeriesWithEpisodes>;
  podcastSeriesSearch?: Maybe<GQLPodcastSeriesSearch>;
  resource?: Maybe<GQLResource>;
  resourceEmbed: GQLResourceEmbed;
  resourceTypes?: Maybe<Array<GQLResourceTypeDefinition>>;
  search?: Maybe<GQLSearch>;
  searchWithoutPagination?: Maybe<GQLSearchWithoutPagination>;
  sharedFolder: GQLSharedFolder;
  subject?: Maybe<GQLSubject>;
  subjectpage?: Maybe<GQLSubjectPage>;
  subjects?: Maybe<Array<GQLSubject>>;
  topic?: Maybe<GQLTopic>;
  topics?: Maybe<Array<GQLTopic>>;
};

export type GQLQueryAllFolderResourcesArgs = {
  size?: InputMaybe<Scalars["Int"]>;
};

export type GQLQueryArticleArgs = {
  absoluteUrl?: InputMaybe<Scalars["Boolean"]>;
  convertEmbeds?: InputMaybe<Scalars["Boolean"]>;
  draftConcept?: InputMaybe<Scalars["Boolean"]>;
  id: Scalars["String"];
  isOembed?: InputMaybe<Scalars["String"]>;
  path?: InputMaybe<Scalars["String"]>;
  showVisualElement?: InputMaybe<Scalars["String"]>;
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryAudioArgs = {
  id: Scalars["Int"];
};

export type GQLQueryCompetenceGoalArgs = {
  code: Scalars["String"];
  language?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryCompetenceGoalsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  language?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryConceptArgs = {
  id: Scalars["Int"];
};

export type GQLQueryConceptSearchArgs = {
  conceptType?: InputMaybe<Scalars["String"]>;
  exactMatch?: InputMaybe<Scalars["Boolean"]>;
  fallback?: InputMaybe<Scalars["Boolean"]>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  language?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
  subjects?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryCoreElementArgs = {
  code: Scalars["String"];
  language?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryCoreElementsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  language?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryFolderArgs = {
  id: Scalars["String"];
  includeResources?: InputMaybe<Scalars["Boolean"]>;
  includeSubfolders?: InputMaybe<Scalars["Boolean"]>;
};

export type GQLQueryFolderResourceMetaArgs = {
  resource: GQLFolderResourceMetaSearchInput;
};

export type GQLQueryFolderResourceMetaSearchArgs = {
  resources: Array<GQLFolderResourceMetaSearchInput>;
};

export type GQLQueryFoldersArgs = {
  includeResources?: InputMaybe<Scalars["Boolean"]>;
  includeSubfolders?: InputMaybe<Scalars["Boolean"]>;
};

export type GQLQueryFrontpageSearchArgs = {
  query?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryGroupSearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars["String"]>>;
  contextTypes?: InputMaybe<Scalars["String"]>;
  fallback?: InputMaybe<Scalars["String"]>;
  filterInactive?: InputMaybe<Scalars["Boolean"]>;
  grepCodes?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["String"]>;
  levels?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
  resourceTypes?: InputMaybe<Scalars["String"]>;
  subjects?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryImageArgs = {
  id: Scalars["String"];
};

export type GQLQueryLearningpathArgs = {
  pathId: Scalars["String"];
};

export type GQLQueryListingPageArgs = {
  subjects?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryPodcastSearchArgs = {
  fallback?: InputMaybe<Scalars["Boolean"]>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
};

export type GQLQueryPodcastSeriesArgs = {
  id: Scalars["Int"];
};

export type GQLQueryPodcastSeriesSearchArgs = {
  fallback?: InputMaybe<Scalars["Boolean"]>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
};

export type GQLQueryResourceArgs = {
  id: Scalars["String"];
  subjectId?: InputMaybe<Scalars["String"]>;
  topicId?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryResourceEmbedArgs = {
  id: Scalars["String"];
  type: Scalars["String"];
};

export type GQLQuerySearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars["String"]>>;
  contextFilters?: InputMaybe<Scalars["String"]>;
  contextTypes?: InputMaybe<Scalars["String"]>;
  fallback?: InputMaybe<Scalars["String"]>;
  filterInactive?: InputMaybe<Scalars["Boolean"]>;
  grepCodes?: InputMaybe<Scalars["String"]>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  language?: InputMaybe<Scalars["String"]>;
  languageFilter?: InputMaybe<Scalars["String"]>;
  levels?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
  relevance?: InputMaybe<Scalars["String"]>;
  resourceTypes?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["String"]>;
  subjects?: InputMaybe<Scalars["String"]>;
};

export type GQLQuerySearchWithoutPaginationArgs = {
  contextFilters?: InputMaybe<Scalars["String"]>;
  contextTypes?: InputMaybe<Scalars["String"]>;
  fallback?: InputMaybe<Scalars["String"]>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  language?: InputMaybe<Scalars["String"]>;
  languageFilter?: InputMaybe<Scalars["String"]>;
  levels?: InputMaybe<Scalars["String"]>;
  query?: InputMaybe<Scalars["String"]>;
  relevance?: InputMaybe<Scalars["String"]>;
  resourceTypes?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["String"]>;
  subjects?: InputMaybe<Scalars["String"]>;
};

export type GQLQuerySharedFolderArgs = {
  id: Scalars["String"];
  includeResources?: InputMaybe<Scalars["Boolean"]>;
  includeSubfolders?: InputMaybe<Scalars["Boolean"]>;
};

export type GQLQuerySubjectArgs = {
  id: Scalars["String"];
};

export type GQLQuerySubjectpageArgs = {
  id: Scalars["Int"];
};

export type GQLQuerySubjectsArgs = {
  filterVisible?: InputMaybe<Scalars["Boolean"]>;
  metadataFilterKey?: InputMaybe<Scalars["String"]>;
  metadataFilterValue?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryTopicArgs = {
  id: Scalars["String"];
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLQueryTopicsArgs = {
  contentUri?: InputMaybe<Scalars["String"]>;
  filterVisible?: InputMaybe<Scalars["Boolean"]>;
};

export type GQLReference = {
  __typename?: "Reference";
  code?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  title: Scalars["String"];
};

export type GQLRelatedContent = {
  __typename?: "RelatedContent";
  title: Scalars["String"];
  url: Scalars["String"];
};

export type GQLResource = GQLTaxonomyEntity &
  GQLWithArticle & {
    __typename?: "Resource";
    article?: Maybe<GQLArticle>;
    availability?: Maybe<Scalars["String"]>;
    breadcrumbs: Array<Scalars["String"]>;
    contentUri?: Maybe<Scalars["String"]>;
    contexts: Array<GQLTaxonomyContext>;
    id: Scalars["String"];
    learningpath?: Maybe<GQLLearningpath>;
    meta?: Maybe<GQLMeta>;
    metadata: GQLTaxonomyMetadata;
    name: Scalars["String"];
    parents?: Maybe<Array<GQLTopic>>;
    path: Scalars["String"];
    paths: Array<Scalars["String"]>;
    rank?: Maybe<Scalars["Int"]>;
    relevanceId?: Maybe<Scalars["String"]>;
    resourceTypes?: Maybe<Array<GQLResourceType>>;
    supportedLanguages: Array<Scalars["String"]>;
  };

export type GQLResourceArticleArgs = {
  convertEmbeds?: InputMaybe<Scalars["Boolean"]>;
  isOembed?: InputMaybe<Scalars["String"]>;
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLResourceEmbed = {
  __typename?: "ResourceEmbed";
  content: Scalars["String"];
  meta: GQLResourceMetaData;
};

export type GQLResourceMetaData = {
  __typename?: "ResourceMetaData";
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
};

export type GQLResourceType = {
  __typename?: "ResourceType";
  id: Scalars["String"];
  name: Scalars["String"];
  resources?: Maybe<Array<GQLResource>>;
};

export type GQLResourceTypeResourcesArgs = {
  topicId: Scalars["String"];
};

export type GQLResourceTypeDefinition = {
  __typename?: "ResourceTypeDefinition";
  id: Scalars["String"];
  name: Scalars["String"];
  subtypes?: Maybe<Array<GQLResourceTypeDefinition>>;
};

export type GQLSearch = {
  __typename?: "Search";
  aggregations: Array<GQLAggregationResult>;
  concepts?: Maybe<GQLConceptResult>;
  language: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize: Scalars["Int"];
  results: Array<GQLSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars["Int"];
};

export type GQLSearchContext = {
  __typename?: "SearchContext";
  breadcrumbs: Array<Scalars["String"]>;
  contextId: Scalars["String"];
  contextType: Scalars["String"];
  id: Scalars["String"];
  isActive: Scalars["Boolean"];
  isPrimary: Scalars["Boolean"];
  isVisible: Scalars["Boolean"];
  language: Scalars["String"];
  learningResourceType: Scalars["String"];
  parentIds: Array<Scalars["String"]>;
  path: Scalars["String"];
  publicId: Scalars["String"];
  relevance: Scalars["String"];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  root: Scalars["String"];
  rootId: Scalars["String"];
  subject: Scalars["String"];
  subjectId: Scalars["String"];
};

export type GQLSearchContextFilter = {
  __typename?: "SearchContextFilter";
  id: Scalars["String"];
  name: Scalars["String"];
  relevance: Scalars["String"];
};

export type GQLSearchContextResourceTypes = {
  __typename?: "SearchContextResourceTypes";
  id: Scalars["String"];
  language: Scalars["String"];
  name: Scalars["String"];
};

export type GQLSearchResult = {
  contexts: Array<GQLSearchContext>;
  id: Scalars["Int"];
  metaDescription: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars["String"]>;
  title: Scalars["String"];
  traits: Array<Scalars["String"]>;
  url: Scalars["String"];
};

export type GQLSearchSuggestion = {
  __typename?: "SearchSuggestion";
  length: Scalars["Int"];
  offset: Scalars["Int"];
  options: Array<GQLSuggestOption>;
  text: Scalars["String"];
};

export type GQLSearchWithoutPagination = {
  __typename?: "SearchWithoutPagination";
  results: Array<GQLSearchResult>;
};

export type GQLSharedFolder = {
  __typename?: "SharedFolder";
  breadcrumbs: Array<GQLBreadcrumb>;
  created: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name: Scalars["String"];
  parentId?: Maybe<Scalars["String"]>;
  resources: Array<GQLFolderResource>;
  status: Scalars["String"];
  subfolders: Array<GQLSharedFolder>;
  updated: Scalars["String"];
};

export type GQLSortResult = {
  __typename?: "SortResult";
  parentId?: Maybe<Scalars["String"]>;
  sortedIds: Array<Scalars["String"]>;
};

export type GQLSubject = GQLTaxonomyEntity & {
  __typename?: "Subject";
  allTopics?: Maybe<Array<GQLTopic>>;
  breadcrumbs: Array<Scalars["String"]>;
  contentUri?: Maybe<Scalars["String"]>;
  contexts: Array<GQLTaxonomyContext>;
  grepCodes: Array<Scalars["String"]>;
  id: Scalars["String"];
  metadata: GQLTaxonomyMetadata;
  name: Scalars["String"];
  path: Scalars["String"];
  paths: Array<Scalars["String"]>;
  rank?: Maybe<Scalars["Int"]>;
  relevanceId: Scalars["String"];
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subjectpage?: Maybe<GQLSubjectPage>;
  supportedLanguages: Array<Scalars["String"]>;
  topics?: Maybe<Array<GQLTopic>>;
};

export type GQLSubjectTopicsArgs = {
  all?: InputMaybe<Scalars["Boolean"]>;
};

export type GQLSubjectPage = {
  __typename?: "SubjectPage";
  about?: Maybe<GQLSubjectPageAbout>;
  banner: GQLSubjectPageBanner;
  id: Scalars["Int"];
  metaDescription?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  supportedLanguages: Array<Scalars["String"]>;
};

export type GQLSubjectPageAbout = {
  __typename?: "SubjectPageAbout";
  description: Scalars["String"];
  title: Scalars["String"];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLSubjectPageBanner = {
  __typename?: "SubjectPageBanner";
  desktopId: Scalars["String"];
  desktopUrl: Scalars["String"];
  mobileId?: Maybe<Scalars["String"]>;
  mobileUrl?: Maybe<Scalars["String"]>;
};

export type GQLSubjectPageVisualElement = {
  __typename?: "SubjectPageVisualElement";
  alt?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  url: Scalars["String"];
};

export type GQLSuggestOption = {
  __typename?: "SuggestOption";
  score: Scalars["Float"];
  text: Scalars["String"];
};

export type GQLSuggestionResult = {
  __typename?: "SuggestionResult";
  name: Scalars["String"];
  suggestions: Array<GQLSearchSuggestion>;
};

export type GQLTags = {
  __typename?: "Tags";
  language: Scalars["String"];
  tags: Array<Scalars["String"]>;
};

export type GQLTaxonomyContext = {
  __typename?: "TaxonomyContext";
  breadcrumbs: Array<Scalars["String"]>;
  parentIds: Array<Scalars["String"]>;
  path: Scalars["String"];
};

export type GQLTaxonomyEntity = {
  breadcrumbs: Array<Scalars["String"]>;
  contentUri?: Maybe<Scalars["String"]>;
  contexts: Array<GQLTaxonomyContext>;
  id: Scalars["String"];
  metadata: GQLTaxonomyMetadata;
  name: Scalars["String"];
  path: Scalars["String"];
  paths: Array<Scalars["String"]>;
  rank?: Maybe<Scalars["Int"]>;
  relevanceId?: Maybe<Scalars["String"]>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  supportedLanguages: Array<Scalars["String"]>;
};

export type GQLTaxonomyMetadata = {
  __typename?: "TaxonomyMetadata";
  customFields: Scalars["StringRecord"];
  grepCodes: Array<Scalars["String"]>;
  visible: Scalars["Boolean"];
};

export type GQLTitle = {
  __typename?: "Title";
  language: Scalars["String"];
  title: Scalars["String"];
};

export type GQLTopic = GQLTaxonomyEntity &
  GQLWithArticle & {
    __typename?: "Topic";
    alternateTopics?: Maybe<Array<GQLTopic>>;
    article?: Maybe<GQLArticle>;
    availability?: Maybe<Scalars["String"]>;
    breadcrumbs: Array<Scalars["String"]>;
    contentUri?: Maybe<Scalars["String"]>;
    contexts: Array<GQLTaxonomyContext>;
    coreResources?: Maybe<Array<GQLResource>>;
    id: Scalars["String"];
    isPrimary?: Maybe<Scalars["Boolean"]>;
    meta?: Maybe<GQLMeta>;
    metadata: GQLTaxonomyMetadata;
    name: Scalars["String"];
    parent?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    path: Scalars["String"];
    pathTopics?: Maybe<Array<Array<GQLTopic>>>;
    paths: Array<Scalars["String"]>;
    rank?: Maybe<Scalars["Int"]>;
    relevanceId?: Maybe<Scalars["String"]>;
    resourceTypes?: Maybe<Array<GQLResourceType>>;
    subtopics?: Maybe<Array<GQLTopic>>;
    supplementaryResources?: Maybe<Array<GQLResource>>;
    supportedLanguages: Array<Scalars["String"]>;
  };

export type GQLTopicArticleArgs = {
  convertEmbeds?: InputMaybe<Scalars["Boolean"]>;
  showVisualElement?: InputMaybe<Scalars["String"]>;
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLTopicCoreResourcesArgs = {
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLTopicSupplementaryResourcesArgs = {
  subjectId?: InputMaybe<Scalars["String"]>;
};

export type GQLUpdatedFolder = {
  __typename?: "UpdatedFolder";
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
};

export type GQLUpdatedFolderResource = {
  __typename?: "UpdatedFolderResource";
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type GQLUptimeAlert = {
  __typename?: "UptimeAlert";
  body?: Maybe<Scalars["String"]>;
  closable: Scalars["Boolean"];
  number: Scalars["Int"];
  title: Scalars["String"];
};

export type GQLVideoFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: "VideoFolderResourceMeta";
  description: Scalars["String"];
  id: Scalars["String"];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type GQLVisualElement = {
  __typename?: "VisualElement";
  brightcove?: Maybe<GQLBrightcoveElement>;
  copyright?: Maybe<GQLCopyright>;
  embed?: Maybe<Scalars["String"]>;
  h5p?: Maybe<GQLH5pElement>;
  image?: Maybe<GQLImageElement>;
  language?: Maybe<Scalars["String"]>;
  oembed?: Maybe<GQLVisualElementOembed>;
  resource?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type GQLVisualElementOembed = {
  __typename?: "VisualElementOembed";
  fullscreen?: Maybe<Scalars["Boolean"]>;
  html?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type GQLWithArticle = {
  availability?: Maybe<Scalars["String"]>;
  meta?: Maybe<GQLMeta>;
};

export type GQLConceptBodyConceptFragment = {
  __typename?: "Concept";
  content: string;
  subjectNames?: Array<string>;
  source?: string;
  articles?: Array<{ __typename?: "Meta"; title: string; id: number }>;
  copyright?: {
    __typename?: "ConceptCopyright";
    origin?: string;
    license?: { __typename?: "License"; license: string };
    creators: Array<{ __typename?: "Contributor"; name: string }>;
  };
  visualElement?: {
    __typename?: "VisualElement";
  } & GQLListingVisualElementFragment;
};

export type GQLConceptPageQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GQLConceptPageQuery = {
  __typename?: "Query";
  concept?: {
    __typename?: "Concept";
    title: string;
  } & GQLConceptBodyConceptFragment &
    GQLLicenseBoxConceptFragment;
};

export type GQLListingVisualElementFragment = {
  __typename?: "VisualElement";
  url?: string;
  title?: string;
  oembed?: {
    __typename?: "VisualElementOembed";
    fullscreen?: boolean;
    html?: string;
    title?: string;
  };
  brightcove?: {
    __typename?: "BrightcoveElement";
    iframe?: { __typename?: "BrightcoveIframe"; src: string };
  };
  image?: {
    __typename?: "ImageElement";
    contentType?: string;
    src: string;
    altText: string;
    focalX?: number;
    focalY?: number;
    lowerRightX?: number;
    lowerRightY?: number;
    upperLeftX?: number;
    upperLeftY?: number;
  };
  h5p?: { __typename?: "H5pElement"; src?: string };
  copyright?: {
    __typename?: "Copyright";
    license: { __typename?: "License"; license: string };
    creators: Array<{ __typename?: "Contributor"; name: string }>;
    rightsholders: Array<{ __typename?: "Contributor"; name: string }>;
  };
};

export type GQLLicenseBoxConceptCopyrightFragment = {
  __typename?: "ConceptCopyright";
  origin?: string;
  license?: { __typename?: "License"; license: string; url?: string };
  creators: Array<{ __typename?: "Contributor"; name: string; type: string }>;
  processors: Array<{ __typename?: "Contributor"; name: string; type: string }>;
  rightsholders: Array<{
    __typename?: "Contributor";
    name: string;
    type: string;
  }>;
};

export type GQLLicenseBoxConceptFragment = {
  __typename?: "Concept";
  id: number;
  created: string;
  title: string;
  image?: {
    __typename?: "ImageLicense";
    src: string;
    altText: string;
    title: string;
    copyright: { __typename?: "Copyright" } & GQLCopyrightInfoFragment;
  };
  copyright?: {
    __typename?: "ConceptCopyright";
  } & GQLLicenseBoxConceptCopyrightFragment;
  visualElement?: {
    __typename?: "VisualElement";
    resource?: string;
    title?: string;
    copyright?: { __typename?: "Copyright" } & GQLCopyrightInfoFragment;
    image?: { __typename?: "ImageElement"; src: string; altText: string };
    brightcove?: {
      __typename?: "BrightcoveElement";
      cover?: string;
      caption?: string;
    };
    h5p?: { __typename?: "H5pElement"; thumbnail?: string };
  };
};

export type GQLListingContainerSubjectFragment = {
  __typename?: "Subject";
} & GQLListingViewSubjectFragment;

export type GQLListingContainerConceptFragment = {
  __typename?: "Concept";
} & GQLListingViewConceptFragment;

export type GQLListingContainerConceptSearchQueryVariables = Exact<{
  query?: InputMaybe<Scalars["String"]>;
  subjects?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  exactMatch?: InputMaybe<Scalars["Boolean"]>;
  fallback?: InputMaybe<Scalars["Boolean"]>;
  language?: InputMaybe<Scalars["String"]>;
}>;

export type GQLListingContainerConceptSearchQuery = {
  __typename?: "Query";
  conceptSearch?: {
    __typename?: "ConceptResult";
    totalCount: number;
    concepts: Array<{ __typename?: "Concept" } & GQLListingContainerConceptFragment>;
  };
};

export type GQLListingPageSubjectFragment = {
  __typename?: "Subject";
} & GQLListingContainerSubjectFragment;

export type GQLListingPageQueryVariables = Exact<{
  listingPageSubjects?: InputMaybe<Scalars["String"]>;
}>;

export type GQLListingPageQuery = {
  __typename?: "Query";
  listingPage?: {
    __typename?: "ListingPage";
    tags?: Array<string>;
    subjects?: Array<{ __typename?: "Subject" } & GQLListingContainerSubjectFragment>;
  };
};

export type GQLListingViewSubjectFragment = {
  __typename?: "Subject";
  id: string;
  name: string;
};

export type GQLListingViewConceptFragment = {
  __typename?: "Concept";
  id: number;
  title: string;
  content: string;
  tags: Array<string>;
  metaImage?: { __typename?: "MetaImage"; url: string };
};

export type GQLContributorInfoFragment = {
  __typename?: "Contributor";
  name: string;
  type: string;
};

export type GQLCopyrightInfoFragment = {
  __typename?: "Copyright";
  origin?: string;
  license: { __typename?: "License"; license: string; url?: string };
  creators: Array<{ __typename?: "Contributor" } & GQLContributorInfoFragment>;
  processors: Array<{ __typename?: "Contributor" } & GQLContributorInfoFragment>;
  rightsholders: Array<{ __typename?: "Contributor" } & GQLContributorInfoFragment>;
};

export type GQLConceptTitleQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GQLConceptTitleQuery = {
  __typename?: "Query";
  concept?: { __typename?: "Concept"; title: string };
};
