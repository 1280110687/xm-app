/**
 * Return a copy of the configuration object.  Once the object is returned, it can be modified by the developer without
 * concern that it will be mutated for the next use.
 *
 * Available resources:
 * 		markerFeed
 * 		scrollStyle
 * 		quoteFeed
 * 		forecastQuoteFeed
 * 		nameValueStore
 * 		chartSharing
 * 		deprecatedSettings
 *
 * @param resources See description, these are imported modules that are passed in to be used by the configuration.
 * @return A configuration object.
 */
export default function getConfig(resources: Resources): Config

import { CIQ } from './chartiq.js';
declare module './defaultConfiguration.js' {
  /**
   * Menu content parameters
   */
  interface Content {
    type: string
    label?: string
    tap?: string
    menuPersist?: boolean
    iconCls?: string
    cls?: string
    cmd?: string
    feature?: string
    method?: string
    filterFor?: string
    filterMin?: number
    helpId?: string
    options?: string
    setget?: string
    className?: string
    id?: string
    value?: string | string[] | number[] | Record<string, string | number>
    attributes?: Record<string, string>
  }
  /**
   * resources that can be passed into the configuration object using getConfig()
   */
  interface Resources {
    nameValueStore?: CIQ.NameValueStore
    deprecatedSettings?: boolean
    quoteFeed?: object
    forecastQuoteFeed?: object
    markerFeed?: object
    chartSharing?: object
    emojiPicker?: object
    scrollStyle?: object
  }
  /**
   * configuration properties
   */
  interface Config {
    initialSymbol: string | InitialSymbol
    chartId?: string
    root: Document
    initialData: undefined
    enabledAddOns: EnabledAddOns
    onNewSymbolLoad: OnNewSymbolLoad
    restore: boolean
    setHtmlLang: boolean
    lookupDriver: object
    hotkeyConfig: HotKeyConfig
    systemMessages: Record<string, SystemMessage>
    marketDefinitionAPIs: Record<string, MarketName>
    marketDefinitionDefaultMapping: string
    marketDefinitionMapping: Record<string, string>
    marketFactory(symbolObject: object): object
    chartEngineParams: ChartEngineParams
    quoteFeeds: QuoteFeeds[]
    selector: Selector
    themes: Themes
    displayStyleIcons: boolean
    menuViewConfig: object
    menuStudiesConfig: MenuStudiesConfig
    drawingTools: DrawingTools[]
    drawingToolGrouping: string[]
    menuRendering: MenuRendering
    addOns: AddOns
    plugins: Plugins
    channels: Channels
    dialogs: Record<string, Dialog>
    eventMarkersImplementation?: object
    scrollbarStyling: ScrollbarStyling
    chartSharing?: object
    multiChartCopySymbol: null
    multiChartLoadMsg: string
    restoreOffgridCharts: boolean
    nameValueStore: CIQ.NameValueStore
    soloActive: SoloActive
    useQueryString: UseQueryString
    ariaActive: string[] | null
    studyOutputAliasList: object
    abstractMarkers: object
    attributions: Attributions
    groups: Groups
    menus: Menus
    toggles: Toggles
    menuChartStyle?: Content[]
    menuChartAggregates?: Content[]
    menuPeriodicity?: Content[]
    menuChartPreferences?: Content[]
    menuYaxisField?: Content[]
    menuYAxisPreferences?: Content[]
    menuAddOns?: Content[]
    rangeMenu?: Content[]
    updateFromQueryString(): void
    onWebComponentsReady(): void
    onEngineReady(stx: CIQ.ChartEngine): void
    onChartReady(stx: CIQ.ChartEngine): void
    onMultiChartEvent(type: string, details: object): void
    getMenu(name: string, sort: boolean|Function): string[]
    createChart(container: HTMLElement): CIQ.ChartEngine
  }
  /**
   * Indicates whether legacy UI components are being used.
   */
  interface InitialSymbol {
    symbol: string
    name?: string
    exchDisp?: string
  }
  /**
   * config.enabledAddOns
   */
  interface EnabledAddOns {
    animation: boolean
    continuousZoom: boolean
    forecasting: boolean
    outliers: boolean
    dataLoader: boolean
    extendedHours: boolean
    fullScreen: boolean
    inactivityTimer: boolean
    rangeSlider: boolean
    shortcuts: boolean
    tableView: boolean
    tooltip: boolean
  }
  /**
   * config.addOns
   */
  interface AddOns {
    tooltip: TooltipAddOn
    inactivityTimer: InactivityTimerAddOn
    animation: AnimationAddOn
    outliers: object
    rangeSlider: object
    fullScreen: object
    extendedHours: ExtendedHoursAddOn
    continuousZoom: ContinuousZoomAddOn
    forecasting: ForecastingAddOn
    tableView: TableViewAddOn
    dataLoader: object
    shortcuts: object
  }
  /**
   * Floating tooltip on mousehover
   *
   * config.addOns.Tooltip
   */
  interface TooltipAddOn {
    ohl: null
    volume: null
    series: boolean
    studies: boolean
  }
  /**
   * Inactivity timer
   *
   * config.addOns.inactivityTimer
   */
  interface InactivityTimerAddOn {
    minutes: number
  }
  /**
   * removeIf(basic)
   * Animation
   *
   * config.addOns.animation
   */
  interface AnimationAddOn {
    animationParameters: object
  }
  /**
   * Extended hours trading zones
   *
   * config.addOns.extendedHours
   */
  interface ExtendedHoursAddOn {
    filter: boolean
  }
  /**
   * Continuous Zoom will also enable the SmartZoom button in your chart zoom controls
   * which allows the end-user to toggle the feature on and off.
   *
   * config.addOns.continuousZoom
   */
  interface ContinuousZoomAddOn {
    periodicities: ContinuousZoomPeriodicity[]
    boundaries: ContinuousZoomBoundaries
  }
  /**
   * config.addOns.continuousZoom.periodicities[integer]
   */
  interface ContinuousZoomPeriodicity {
    period: number
    interval: string
    timeUnit?: string
  }
  /**
   * config.addOns.continuousZoom.boundaries
   */
  interface ContinuousZoomBoundaries {
    maxCandleWidth: number
    minCandleWidth: number
  }
  /**
   * config.addOns.forecasting
   */
  interface ForecastingAddOn {
    moduleName: string
    id: string
    decorator: object
    renderingParameters: object
    quoteFeed?: object
    behavior: object
  }
  /**
   * config.addOns.tableView
   */
  interface TableViewAddOn {
    coverContainer?: string
  }
  /**
   * config.onNewSymbolLoad
   */
  interface OnNewSymbolLoad {
    removeSeries(series: object): boolean
    continuousZoom?: Function
  }
  /**
   * config.hotkeyConfig
   */
  interface HotKeyConfig {
    hotkeys: HotKey
    keysToRepeat: string[]
  }
  /**
   * config.hotkeyConfig.hotkeys[integer].options
   */
  interface HotKeyOptions {
    percent?: number
    bars?: number
  }
  /**
   * config.hotkeyConfig.hotkeys
   */
  interface HotKey {
    label: string
    action: string
    commands: string[]
    extension?: string
    ariaLabel?: string
    options: HotKeyOptions
  }
  /**
   * config.systemMessages[string]
   */
  interface SystemMessage {
    message: string
    type?: string
    displayTime?: number
    boolean?: boolean
  }
  interface MarketName {
    /**
     * - The APIClient endpoint for the market definition API.
     */
    endpoint: string
    /**
     * - Optional function which is called prior to calling the APIClient endpoint and must return the configuration object that will be passed to APIClient
     */
    extract?: Function
    /**
     * - Optional function which receives the raw API response and is responsible for parsing it and transforming it into the ChartIQ cannonical form.
     */
    transform?: Function
  }
  /**
   * config.chartEngineParams
   */
  interface ChartEngineParams {
    preferences: ChartEnginePreferences
  }
  /**
   * config.chartEngineParams.preferences
   */
  interface ChartEnginePreferences {
    labels: boolean
    currentPriceLine: boolean
    whitespace: number
    displayCrosshairsWithDrawingTool: boolean
  }
  /**
   * config.quoteFeeds[integer].behavior
   */
  interface QuoteFeedsBehavior {
    refreshInterval: number
    backgroundRefreshInterval: number
    bufferSize: number
  }
  /**
   * config.quoteFeeds
   */
  interface QuoteFeeds {
    quoteFeed?: object
    behavior: QuoteFeedsBehavior
  }
  /**
   * config.selector
   */
  interface Selector {
    sideNav: string
    sidePanel: string
    lookupComponent: string
    studyLegend: string
    timeSpanEvent: string
    markersMenuItem: string
    themesMenuItem: string
    tfcTradePanel: string
    tfcToggle: string
  }
  /**
   * config.themes
   */
  interface Themes {
    builtInThemes: object
    defaultTheme: string
    nameValueStore: string
  }
  /**
   * config.menuStudiesConfig.excludedStudies
   */
  interface ExcludedStudies {
    stochastics: boolean
    DoM?: boolean
  }
  /**
   * config.menuStudiesConfig
   */
  interface MenuStudiesConfig {
    excludedStudies: ExcludedStudies
    alwaysDisplayDialog: object
  }
  /**
   * config.drawingTools[integer]
   */
  interface DrawingTools {
    type: string
    tool: string
    group: string
    label: string
    shortcut?: string
  }
  /**
   * config.menuRendering
   */
  interface MenuRendering {
    item(params: object): string
    checkbox(params: object): string
    dt(params: object): string
  }
  /**
   * config.plugins
   */
  interface Plugins {
    ptv?: PtvPlugin
    marketDepth?: MarketDepthPlugin
    tfc?: TfcPlugin
    crossSection?: CrossSectionPlugin
    visualEarnings?: VisualEarningsPlugin
    signalIQ?: SignalIQPlugin
    studyBrowser?: StudyBrowserPlugin
    scriptIQ?: object
    technicalViews?: TechnicalViewsPlugin
    technicalInsights?: TechnicalInsightsPlugin
    timeSpanEventPanel?: object
  }
  /**
   * config.plugins.ptv
   */
  interface PtvPlugin {
    moduleName: string
    menuItemSelector: string
    loadSample: boolean
    showTooltip: boolean
    infoPanel: object
  }
  /**
   * Enable the Active Trader Market Depth panel
   *
   * config.plugins.marketDepth
   */
  interface MarketDepthPlugin {
    height: string
    precedingContainer?: string
    volume: boolean
    mountain: boolean
    step: boolean
    orderbook?: boolean
    interaction: boolean
    record: boolean
  }
  /**
   * Trade From Chart (TFC)
   * set account key to your custom account class, or leave as undefined to default to CIQ.Account.Demo constructor
   * import plugins/tfc/tfc-demo.js or set loadSample=true to make CIQ.Account.Demo available for sample account creation
   *
   * config.plugins.tfc
   */
  interface TfcPlugin {
    moduleName: string
    container: string
    channel: string
    toggleMarkup: string
    loadSample: boolean
    startCompact: boolean
  }
  /**
   * config.plugins.crossSection
   */
  interface CrossSectionPlugin {
    pointFreshnessTimeout: number
    enableTimeSeries: boolean
    xAxisType: string
    timelineDateSelector: object
    postInstall(params: object): void
    sortFunction?: Function
  }
  /**
   * config.plugins.crossSection
   */
  interface VisualEarningsPlugin {
    container: string
  }
  /**
   * config.plugins.signalIQ
   */
  interface SignalIQPlugin {
    panelHeight: number
    displayCondition: boolean
    emojiPicker?: SignalIQEmojiPicker
    disallowedStudies: string[]
  }
  /**
   * config.plugins.signalIQ.emojiPicker
   */
  interface SignalIQEmojiPicker {
    open(params: object): void
    clean(): void
    emojis: string[]
  }
  /**
   * config.plugins.studyBrowser
   */
  interface StudyBrowserPlugin {
    promoteStudiesMenu: boolean
    postInstall(params: object): void
  }
  /**
   * config.plugins.technicalViews
   */
  interface TechnicalViewsPlugin {
    container: string
    moduleName: string
    token: string
    channel: string
    toggleMarkup: string
    partner: number
  }
  /**
   * config.plugins.technicalInsights
   */
  interface TechnicalInsightsPlugin {
    container: string
    moduleName: string
    lang: string
    token: string
    channel: string
    toggleMarkup: string
  }
  /**
   * config.channels
   */
  interface Channels {
    lookup: string
    crosshair: string
    headsUp: string
    sidenav: string
    tableView: string
    drawing: string
    drawingPalettes: string
    breakpoint: string
    containerSize: string
    sidenavSize: string
    sidepanelSize: string
    pluginPanelHeight: string
    tfc: string
    technicalviews: string
    technicalinsights: string
    dataLoader: string
    dialog: string
    keyboardNavigation: string
    class: string
  }
  /**
   * config.dialogs[string]
   */
  interface Dialog {
    tag: string
    attributes: Record<string, string>
  }
  /**
   * Scrollbar styling implementation for cq-scroll component
   *
   * config.scrollbarStyling
   */
  interface ScrollbarStyling {
    refresh(component: HTMLElement, options: object): void
    destroy(component: HTMLElement): void
  }
  /**
   * In multichart setting expand active chart by hiding all others for following settings
   *
   * config.soloActive
   */
  interface SoloActive {
    onDraw: object
    onTFC: object
    onTechnicalInsights: object
    onTechnicalViews: object
  }
  /**
   * Setting to load initial symbol from a URL.
   *
   * If symbolParam defined query string parameter is provided in URL then this configs:
   * - `initialSymbol` property will be updated based on query string
   * - `restore` property will be updated to `restore.symbol = false`
   * Adjust or delete from config if this default behavior is not desired
   *
   * config.useQueryString
   */
  interface UseQueryString {
    symbolObject: object
  }
  /**
   * config.attributions
   */
  interface Attributions {
    sources: object
    exchanges: object
  }
  /**
   * config.groups
   */
  interface Groups {
    range: GroupsRange
  }
  /**
   * config.groups.range
   */
  interface GroupsRange {
    content: Content[]
  }
  /**
   * config.menus
   */
  interface Menus {
    crosshair: MenusCrosshair
    display: MenusDisplay
    info: MenusInfo
    markers: MenusMarkers
    period: MenusPeriod
    preferences: MenusPreferences
    studies: MenusStudies
    studybrowser: MenusStudybrowser
    views: MenusViews
    cvplinestyle: MenusCvplinestyle
    fontfamily: MenusFontfamily
    fontsize: MenusFontsize
    linestyle: MenusLinestyle
    toolgrouping: MenusToolgrouping
    wavecorrective: MenusWavecorrective
    waveimpulse: MenusWaveimpulse
    wavetemplate: MenusWavetemplate
  }
  /**
   * navigation menus
   *
   * config.menus.crosshair
   */
  interface MenusCrosshair {
    content: Content[]
  }
  /**
   * config.menus.display
   */
  interface MenusDisplay {
    content: Content[]
  }
  /**
   * config.menus.info
   */
  interface MenusInfo {
    content: Content[]
  }
  /**
   * config.menus.markers
   */
  interface MenusMarkers {
    content: Content[]
  }
  /**
   * config.menus.period
   */
  interface MenusPeriod {
    content: Content[]
  }
  /**
   * config.menus.preferences
   */
  interface MenusPreferences {
    content: Content[]
  }
  /**
   * config.menus.studies
   */
  interface MenusStudies {
    content: Content[]
  }
  /**
   * removeIf(basic)
   *
   * config.menus.studybrowser
   */
  interface MenusStudybrowser {
    content: Content[]
    noscroll: boolean
  }
  /**
   * endRemoveIf(basic)
   *
   * config.menus.views
   */
  interface MenusViews {
    content: Content[]
  }
  /**
   * drawing palette menus
   *
   * config.menus.cvplinestyle
   */
  interface MenusCvplinestyle {
    content: Content[]
  }
  /**
   * config.menus.fontfamily
   */
  interface MenusFontfamily {
    content: Content[]
  }
  /**
   * config.menus.fontsize
   */
  interface MenusFontsize {
    content: Content[]
  }
  /**
   * config.menus.linestyle
   */
  interface MenusLinestyle {
    content: Content[]
  }
  /**
   * config.menus.toolgrouping
   */
  interface MenusToolgrouping {
    content: Content[]
  }
  /**
   * config.menus.wavecorrective
   */
  interface MenusWavecorrective {
    content: Content[]
  }
  /**
   * config.menus.waveimpulse
   */
  interface MenusWaveimpulse {
    content: Content[]
  }
  /**
   * config.menus.wavetemplate
   */
  interface MenusWavetemplate {
    content: Content[]
  }
  /**
   * config.toggles
   */
  interface Toggles {
    crosshair: TogglesCrosshair
    info: TogglesInfo
    symbolsearch: TogglesSymbolsearch
  }
  /**
   * config.toggles.crosshair
   */
  interface TogglesCrosshair {
    callbacks: Function[]
  }
  /**
   * config.toggles.info
   */
  interface TogglesInfo {
    callbacks: Function[]
  }
  /**
   * config.toggles.symbolsearch
   */
  interface TogglesSymbolsearch {
    callbacks: Function[]
  }
}
