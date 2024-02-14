import React, { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import './PageSpeedInsights.css';
import Chart from 'chart.js/auto';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

Chart.register(CategoryScale);

const PageSpeedInsights = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});
  const [totalByteWeight, setTotalByteWeight] = useState(0);
  const [screenshot, setScreenshot] = useState('');
  const [thumbnailData, setthumbnailData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile'); // Added state for device selection
  const [unsizedImagesData, setUnsizedImagesData] = useState({}); 
  const [unusedCssData, setUnusedCssData] = useState({});// Add state for unused-css
  const [unminifiedJavascriptData, setUnminifiedJavascriptData] = useState({}); // Add state for unminified-javascript
  const [unusedJavascriptData, setUnusedJavascriptData] = useState({}); // Add state for unused-javascript
  const [unminifiedCssData, setUnminifiedCSSData] = useState({}); // Add state for unminified-javascript
  const [thirdPartySummaryData, setThirdPartySummaryData] = useState({});
  const [usesResponsiveImagesData, setUsesResponsiveImagesData] = useState({});
  const [offscreenImagesData, setOffscreenImagesData] = useState({});
  // Set state for Minimize Render-Blocking Resources
  const [renderBlockingResourcesData, setRenderBlockingResourcesData] = useState({});
  // Set state for Main-Thread Work Breakdown
  const [mainThreadWorkBreakdownData, setMainThreadWorkBreakdownData] = useState({});
  // Set state for DOM Size
  const [domSizeData, setDomSizeData] = useState({});
  // Set state for Modern Image Formats
  const [modernImageFormatsData, setModernImageFormatsData] = useState({});
  // Set state for Uses Long Cache TTL
  const [longCacheTTLData, setLongCacheTTLData] = useState({});
  // Set state for font-display
  const [fontDisplayData, setFontDisplayData] = useState({});
  // Set state for uses-passive-event-listeners
  const [usesPassiveEventListenersData, setUsesPassiveEventListenersData] = useState({});
  // Set state for uses-optimized-images
  const [usesOptimizedImagesData, setUsesOptimizedImagesData] = useState({});
  // Set state for total-byte-weight
  const [totalByteWeightData, setTotalByteWeightData] = useState({});  
  // Set state for long-tasks
  const [longTasksData, setLongTasksData] = useState({});
  // Set state for layout-shift-elements
  const [layoutShiftElementsData, setLayoutShiftElementsData] = useState({});
  // Set state for user-timings
  const [userTimingsData, setUserTimingsData] = useState({});
  // Set state for server-response-time
  const [serverResponseTimeData, setServerResponseTimeData] = useState({});
  // Set state for critical-request-chains
  const [criticalRequestChainsData, setCriticalRequestChainsData] = useState({});
 
  // Set state for largest-contentful-paint-element
  // Set state for avoid-multiple-page-redirects
  const [avoidRedirectsData, setAvoidRedirectsData] = useState({});
  // Set state for uses-rel-preload
  const [usesRelPreloadData, setUsesRelPreloadData] = useState({});
  // Set state for efficient-animated-content
  const [efficientAnimatedContentData, setEfficientAnimatedContentData] = useState({});
  // Set state for duplicated-javascript
  const [duplicatedJavascriptData, setDuplicatedJavascriptData] = useState({});
  // Set state for third-party-facades
  const [thirdPartyFacadesData, setThirdPartyFacadesData] = useState({});

  const [largestContentPaintData, setLargestContentPaintData] = useState({});
  // Set state for largestContentPaintData
   const [preloadLCPImageData, setPreloadLCPImageData] = useState({});
   // Set state for legacyJavascriptData
   const [legacyJavascriptData, setLegacyJavascriptData] = useState({});  
   // Set state for bootupTimeData
   const [bootupTimeData, setBootupTimeData] = useState({});    
   // Set state for nonCompositedAnimationsData
   const [nonCompositedAnimationsData, setNonCompositedAnimationsData] = useState({});  
   // Set state for usesTextCompression
   const [usesTextCompressionData, setUsesTextCompressionData] = useState({});    
    // Set state for usesRelPreconnect
   const [usesRelPreconnectData, setUsesRelPreconnectData] = useState({});

  //  const [viewportData, setViewportData] = useState({});  largestContentfulaint-element
  const [noDocumentWriteData, setNoDocumentWriteData] = useState({}); 
  

   // Set state for network-requests
  const [networkRequestsData, setNetworkRequestsData] = useState({});
  
   

  const apiKey = "AIzaSyCdLrXZ60ygA3MnE_XpyTietE6VL_VPwVg";
  
  const calculateCO2ePerNewVisit = (totalByteWeight) => {

    console.log("Total New data:",totalByteWeight);

    const totalByteWeightMB = totalByteWeight / 1024;
    const newTotalByteWeightMB = totalByteWeightMB.toFixed(2); 
    const pageWeight = 1.8; // Replace this with the actual page weight in MB
    const averageCO2ePerNewVisit = 0.6; // Replace this with the actual average CO2e per new visit in gm

    // Calculate CO2e per new visit
    const co2ePerNewVisit = (newTotalByteWeightMB / (pageWeight * 1024)) * averageCO2ePerNewVisit; // Convert page weight to KiB

    return co2ePerNewVisit.toFixed(2)
  };

  const totalByteWeightMB = totalByteWeight / 1024;
  const newTotalByteWeightMB = totalByteWeightMB.toFixed(2); 

  const resultSections = [
    { data: unminifiedCssData, title: "Unminified CSS" },
    { data: unminifiedJavascriptData, title: "Unminified JavaScript" },
    { data: unsizedImagesData, title: "Image elements do not have explicit `width` and `height`" },
    { data: unusedCssData, title: "Reduce unused CSS" },
    { data: unusedJavascriptData, title: "Reduce unused JavaScript" },
    { data: thirdPartySummaryData, title: "Reduce the impact of third-party code" },
    { data: offscreenImagesData, title: "Defer offscreen images" },
    { data: usesResponsiveImagesData, title: "Properly size images" },
    { data: renderBlockingResourcesData, title: "Eliminate render-blocking resources" },
    { data: mainThreadWorkBreakdownData, title: "Minimize main-thread work" },
    { data: domSizeData, title: "Avoid an excessive DOM size" },
    { data: modernImageFormatsData, title: "Serve images in next-gen formats" },
    { data: longCacheTTLData, title: "Serve static assets with an efficient cache policy" },
    { data: fontDisplayData, title: "Ensure text remains visible during webfont load" },
    { data: usesPassiveEventListenersData, title: "Does not use passive listeners to improve scrolling performance" },
    { data: usesOptimizedImagesData, title: "Efficiently encode images" },
    { data: totalByteWeightData, title: "Avoid enormous network payloads" },
    { data: longTasksData, title: "Avoid long main-thread tasks" },
    { data: layoutShiftElementsData, title: "Avoid large layout shifts" },
    { data: userTimingsData, title: "User Timing marks and measures" },
    { data: serverResponseTimeData, title: "Server Response Time" },
    { data: criticalRequestChainsData, title: "Avoid chaining critical requests" },
    { data: avoidRedirectsData, title: "Avoid multiple page redirects" },
    { data: usesRelPreloadData, title: "Preload key requests" },
    { data: efficientAnimatedContentData, title: "Use video formats for animated content" },
    { data: duplicatedJavascriptData, title: "Remove duplicate modules in JavaScript bundles" },
    { data: thirdPartyFacadesData, title: "Lazy load third-party resources with facades" },
    { data: largestContentPaintData, title: "Largest Contentful Paint image was lazily loaded" },
    { data: preloadLCPImageData, title: "Preload Largest Contentful Paint image" },
    { data: legacyJavascriptData, title: "Avoid serving legacy JavaScript to modern browsers" },
    { data: bootupTimeData, title: "Reduce JavaScript execution time" } ,
    { data: nonCompositedAnimationsData, title: "Avoid non-composited animations" },
    { data: usesTextCompressionData, title: "Enable text compression" },
    { data: usesRelPreconnectData, title: "Preconnect to required origins" },
    // { data: viewportData, title: "Does not have a `\u003cmeta name=\"viewport\"\u003e` tag with `width` or `initial-scale`" }
    { data: noDocumentWriteData, title: "Avoids `document.write()`" },

    { data: networkRequestsData, title: "Network Requests" },
    
    
    // Add more result sections as needed
  ];
  const sortedResultSections = resultSections.sort((a, b) => {
    if (a.data.score === null || a.data.score === undefined) return 1;
    if (b.data.score === null || b.data.score === undefined) return -1;
    return a.data.score - b.data.score;
  });
  
 

  const renderResultDetails = (resultSection) => {
    switch (resultSection.title) {
      case "Unminified CSS":
        return (
          <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
        );

      case "Unminified JavaScript":
        return (
          <ul>
            {resultSection.data.items && resultSection.data.items.map((item, index) => (
              <li key={index}>
                <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
                <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
                <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
              </li>
            ))}
          </ul>
        );

        case "Image elements do not have explicit `width` and `height`":
      return (
        <ul>
        {resultSection.data.items && resultSection.data.items.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Path: {item.path}</p>
            <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </li>
        ))}
      </ul>
      );

    case "Reduce unused CSS":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
            <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
            <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Reduce unused JavaScript":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
            <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size:  {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Reduce the impact of third-party code":
      return (
        <table>
        <thead>
          <tr>
            <th>Third Party:</th>
            <th>Transfer Size:</th>
            <th>Main Thread Time: </th>
          </tr>
        </thead>
        <tbody>
        {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
              <td>{bytesToKiB(item.transferSize)} KiB</td>
              <td>{item.mainThreadTime} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      );

      


      
      case "Defer offscreen images":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Properly size images":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Transfer Size: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Potential Savings: {bytesToKiB(item.wastedBytes)} KiB</p>
            </li>
          ))}
        </ul>
      );
      
      case "Eliminate render-blocking resources":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {bytesToKiB(item.totalBytes)} KiB</p>
              <p>Wasted Milliseconds: {item.wastedMs} ms</p>
            </li>
          ))}
        </ul>
      );

      case "Minimize main-thread work":
      return (
        <table>
        <thead>
          <tr>
            <th>category</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
        {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.groupLabel}</td>
              <td>{item.duration.toFixed(0)} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );

      case "Avoid an excessive DOM size":
      return (
        <ul>
          {resultSection.data.details && resultSection.data.details.map((item, index) => (
            <li key={index}>
              <p>Statistic: {item.statistic}</p>
              <p>Node: {item.node ? item.node.selector : 'N/A'}</p>
              <p>Value: {item.value}</p>
            </li>
          ))}
        </ul>
      );

      case "Serve images in next-gen formats":
      return (
        <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>URL: <a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></p>
              <p>Total Bytes: {item.totalBytes} bytes</p>
              <p>Potential Savings: {item.wastedBytes} bytes</p>
              {/* Add additional information from item.node if needed */}
            </li>
          ))}
        </ul>
      );

      case "Serve static assets with an efficient cache policy":
      return (
       
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Cache Lifetime</th>
                </tr>
              </thead>
              <tbody>
                {resultSection.data.items && resultSection.data.items.map((item, index) => (
                  <tr key={index}>
                    <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                    <td>{item.cacheLifetimeMs} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
      );

      case "Ensure text remains visible during webfont load":
      return (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Potential Savings (ms)</th>
            </tr>
          </thead>
          <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
              <tr key={index}>
                <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                <td>{item.wastedMs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );


      case "Does not use passive listeners to improve scrolling performance":
      return (
     
        <table>
            <thead>
              <tr>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <p>URL: <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.url}</a></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Efficiently encode images":
      return (
        <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Resource Size</th>
            <th>Potential Savings</th>
          </tr>
        </thead>
        <tbody>
         {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
            <tr key={index}>
              <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
              <td>{item.totalBytes} bytes</td>
              <td>{item.wastedBytes} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );

      case "Avoid enormous network payloads":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Transfer Size</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.totalBytes} bytes</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Avoid long main-thread tasks":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Start Time (ms)</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                  <td>{item.startTime}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      );

      case "Avoid large layout shifts":
      return (
        <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Weighted Score</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.node && item.node.nodeLabel}</td>
                  <td>{item.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      );


      case "User Timing marks and measures":
      return (
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Start Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.timingType}</td>
                  <td>{item.startTime} ms</td>
                  <td>{item.duration} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );


      case "Server Response Time":
      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Time Spent (ms)</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.items && resultSection.data.items.map((item, index) => (
                <tr key={index}>
                  <td><a target="_blank" href={item.url} rel="noreferrer">{item.url}</a></td>
                  <td>{item.responseTime} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
      );

    

  case "Avoid multiple page redirects":
    return (
      
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Redirects</th>
              <th>Wasted Time</th>
            </tr>
          </thead>
          <tbody>
            { resultSection.data.items && resultSection.data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.url}</td>
                <td>{item.redirects}</td>
                <td>{item.wastedMs.toFixed(2)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
     
  );
  
  case "Preload key requests":
    return (
      
      <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Total Blocking Time</th>
        </tr>
      </thead>
      <tbody>
      { resultSection.data.items && resultSection.data.items.map((item, index) => (
          <tr key={index}>
            <td>{item.url}</td>
            <td>{item.totalBlockingTime.toFixed(2)} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
     
  );

  case "Use video formats for animated content":
    return (
      <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Total Blocking Time</th>
              </tr>
            </thead>
            <tbody>
            { resultSection.data.items && resultSection.data.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.url}</td>
                  <td>{item.totalBlockingTime.toFixed(2)} ms</td>
                </tr>
              ))}
            </tbody>
      </table>
  );

  

    case "Remove duplicate modules in JavaScript bundles":
      return (
        <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Total Bytes</th>
                  <th>Wasted Bytes</th>
                </tr>
              </thead>
              <tbody>
              {resultSection.data.items && resultSection.data.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.url}</td>
                    <td>{item.totalBytes}</td>
                    <td>{item.wastedBytes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    );

    case "Lazy load third-party resources with facades":
      return (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Facades</th>
                <th>Wasted Ms</th>
              </tr>
            </thead>
            <tbody>
            {resultSection.data.items && resultSection.data.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.url}</td>
                  <td>{item.facades}</td>
                  <td>{item.wastedMs.toFixed(2)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
    );
     
    case "Largest Contentful Paint image was lazily loaded":
        return (
          <ul>
          {resultSection.data.items && resultSection.data.items.map((item, index) => (
            <li key={index}>
              <p>{item.title}</p>
              <p>Path: {item.path}</p>
              <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </li>
          ))}
        </ul> );


      case "Preload Largest Contentful Paint image":
      return (
        <ul>
        {resultSection.data.items && resultSection.data.items.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>Path: {item.path}</p>
            <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </li>
        ))}
      </ul> );


            case "Avoid serving legacy JavaScript to modern browsers":
              return (
                <table>
                    <thead>
                      <tr>
                        <th>URL</th>
                        <th>Transfer Size</th>
                      </tr>
                    </thead>
                    <tbody>
                    {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                        <tr key={index}>
                          <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                          <td>{item.totalBytes} bytes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
             
              );


              case "Reduce JavaScript execution time":
              return (
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Total CPU Time</th>
                      <th>Script Evaluation</th>
                      <th>Script Parse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultSection.data.details && resultSection.data.details.items.map((item, index) => (
                      <tr key={index}>
                        <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                        <td>{item.total.toFixed(0)} ms</td>
                        <td>{item.scripting.toFixed(0)} ms</td>
                        <td>{item.scriptParseCompile.toFixed(0)} ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             
              );


              case "Avoid non-composited animations":
                return (
                  <ul>
                  {resultSection.data.items && resultSection.data.items.map((item, index) => (
                    <li key={index}>
                      <p>{item.title}</p>
                      <p>Path: {item.path}</p>
                      <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                    </li>
                  ))}
                </ul> );


                  case "Enable text compression":
                    return (
                      <ul>
                      {resultSection.data.items && resultSection.data.items.map((item, index) => (
                        <li key={index}>
                          <p>{item.title}</p>
                          <p>Path: {item.path}</p>
                          <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        </li>
                      ))}
                    </ul> );
                    case "Avoids `document.write()`":
                      return (
                        <ul>
                        {resultSection.data.items && resultSection.data.items.map((item, index) => (
                          <li key={index}>
                            <p>{item.title}</p>
                            <p>Path: {item.path}</p>
                            <img src={item.path} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                          </li>
                        ))}
                      </ul> );

                      case  "Preconnect to required origins":
                        return (
                        
                            <div>
                              <h3>Warnings:</h3>
                              <ul>
                              {usesRelPreconnectData.warnings && usesRelPreconnectData.warnings.map((warning, index) => (
                                  <li key={index}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                        );

      case "Network Requests":

      return (
        <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Resource Type</th>
                <th>Resource Size</th>
                <th>Network Request Time</th>
                <th>Priority</th>
                
              </tr>
            </thead>
            <tbody>
            {resultSection.data.details &&
              resultSection.data.details.items
                .sort((a, b) => {
                  if (a.priority === "Low" && b.priority !== "Low") {
                    return -1; // Low priority comes first
                  } else if (a.priority !== "Low" && b.priority === "Low") {
                    return 1; // Non-Low priority comes first
                  } else if (a.priority === "Low" && b.priority === "Low") {
                    // If both are Low priority, sort by resource size in descending order
                    return b.resourceSize - a.resourceSize;
                  } else {
                    // If priorities are the same, sort by resource size in ascending order
                    return a.resourceSize - b.resourceSize;
                  }
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a target="_blank" href={item.url} rel="noreferrer">
                        {item.url}
                      </a>
                    </td>
                    <td>{item.resourceType}</td>
                    <td>{item.resourceSize}</td>
                    <td>{item.networkRequestTime}</td>
                    <td>{item.priority}</td>
                  </tr>
                ))}
            </tbody>
          </table>
      );

      // Add cases for other result sections

      default:
        return null; // Default case, no specific details to render
    }
  };


 

  const getPageSpeedInsights = async (e) => {
    e.preventDefault();

    const inputURL = e.target.url.value;
    setLoadingMessage("Please wait...Running...");

    try {
      const url = buildQueryURL(inputURL, apiKey);
      const response = await fetch(url);
      const json = await response.json();

  

      const lighthouseData = json.lighthouseResult;

      // Display information for "thumbnails"
        const thirdPartyItems = lighthouseData.audits["screenshot-thumbnails"].details.items;
                
        // Extract information from screenshot-thumbnails items
        const thirdPartyJavascriptData = {

          items: thirdPartyItems.map(item => ({
          data: item.data,


          }))
        };

        setthumbnailData(thirdPartyJavascriptData);

        

       /****************START: Image elements do not have explicit `width` and `height`****************/


      // Display information for "unsized-images" similarly to unminified-javascript
    const unsizedImagesItems = lighthouseData.audits["unsized-images"].details.items;
    console.log(unsizedImagesItems);


    // Extract URLs from unsized-images items
    const imageDetails = unsizedImagesItems.map(item => (
      {
        title: item.node.nodeLabel,
        url: item.url,
        path: item.node.snippet.match(/src="([^"]*)"/)[1]
      }
    ));


    const unsizedImagesData = {
      title: lighthouseData.audits["unsized-images"].title,
      description: lighthouseData.audits["unsized-images"].description,
      items: imageDetails
    };


    setUnsizedImagesData(unsizedImagesData);


    /****************END: Image elements do not have explicit `width` and `height`****************/


        /****************START: Minify JS****************/


         // Display information for "unminified-javascript"
      const unminifiedJavascriptItems = lighthouseData.audits["unminified-javascript"].details.items;
      console.log(unminifiedJavascriptItems);


      // Extract information from unminified-javascript items
      const unminifiedJavascriptData = {
        title: lighthouseData.audits["unminified-javascript"].title,
        description: lighthouseData.audits["unminified-javascript"].description,
        score: lighthouseData.audits["unminified-javascript"].score,
        displayValue: lighthouseData.audits["unminified-javascript"].displayValue,
        items: unminifiedJavascriptItems.map(item => ({
          url: item.url,
          totalBytes: item.totalBytes,
          wastedBytes: item.wastedBytes,
        }))
      };


      setUnminifiedJavascriptData(unminifiedJavascriptData);
     
      /****************END: Minify JS****************/


        /****************START: Minify CSS****************/


         // Display information for "unminified-css"
      const unminifiedCssItems = lighthouseData.audits["unminified-css"].details.items;
      console.log(unminifiedCssItems);


      // Extract information from unminified-css items
      const unminifiedCssData = {
        title: lighthouseData.audits["unminified-css"].title,
        description: lighthouseData.audits["unminified-css"].description,
        score: lighthouseData.audits["unminified-css"].score,
        displayValue: lighthouseData.audits["unminified-css"].displayValue,
        items: unminifiedCssItems.map(item => ({
          url: item.url,
          totalBytes: item.totalBytes,
          wastedBytes: item.wastedBytes,
        }))
      };


      setUnminifiedCSSData(unminifiedCssData);
     
      /****************END: Minify CSS****************/


 /****************Start: Reduce unused CSS****************/


// Extract information from unused-javascript items
const unusedCssItems = json.lighthouseResult.audits["unused-css-rules"].details.items;
const unusedCssData = {
  title: json.lighthouseResult.audits["unused-css-rules"].title,
  description: json.lighthouseResult.audits["unused-css-rules"].description,
  score: json.lighthouseResult.audits["unused-css-rules"].score,
  displayValue: json.lighthouseResult.audits["unused-css-rules"].displayValue,
  items: unusedCssItems.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  }))
};


setUnusedCssData(unusedCssData);


/****************End : Reduce unused CSS****************/

/****************Start: Reduce unused JavaScript****************/


// Extract information from unused-javascript items
const unusedJavascriptItems = json.lighthouseResult.audits["unused-javascript"].details.items;
const unusedJavascriptData = {
  title: json.lighthouseResult.audits["unused-javascript"].title,
  description: json.lighthouseResult.audits["unused-javascript"].description,
  score: json.lighthouseResult.audits["unused-javascript"].score,
  displayValue: json.lighthouseResult.audits["unused-javascript"].displayValue,
  items: unusedJavascriptItems.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  }))
};


setUnusedJavascriptData(unusedJavascriptData);


/****************End : Reduce unused JavaScript****************/


// Display information for "third-party-summary"
const thirdPartySummaryData = json.lighthouseResult.audits["third-party-summary"].details.items;

// Extract information from third-party-summary
const thirdPartySummary = {
  title: json.lighthouseResult.audits["third-party-summary"].title,
  description: json.lighthouseResult.audits["third-party-summary"].description,
  score: json.lighthouseResult.audits["third-party-summary"].score,
  displayValue: json.lighthouseResult.audits["third-party-summary"].displayValue,
  items: thirdPartySummaryData.flatMap(item => (
    item.subItems.items.map(subItem => ({
      url: subItem.url,
      transferSize: subItem.transferSize,
      mainThreadTime: subItem.blockingTime, // Correcting access to mainThreadTime
    }))
  )),
};

setThirdPartySummaryData(thirdPartySummary);

// Display information for "offscreen-images"
const offscreenImagesData = lighthouseData.audits["offscreen-images"];
console.log(offscreenImagesData);

// Extract information from offscreen-images
const offscreenImages = {
  title: offscreenImagesData.title,
  description: offscreenImagesData.description,
  score: offscreenImagesData.score,
  displayValue: offscreenImagesData.displayValue,
  items: offscreenImagesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  })),
};


setOffscreenImagesData(offscreenImages);

// Display information for "uses-responsive-images"
const usesResponsiveImagesData = lighthouseData.audits["uses-responsive-images"];
console.log(usesResponsiveImagesData);

// Extract information from uses-responsive-images
const usesResponsiveImages = {
  title: usesResponsiveImagesData.title,
  description: usesResponsiveImagesData.description,
  score: usesResponsiveImagesData.score,
  displayValue: usesResponsiveImagesData.displayValue,
  items: usesResponsiveImagesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
  })),
};



setUsesResponsiveImagesData(usesResponsiveImages);


// Display information for "Minimize Render-Blocking Resources"
const renderBlockingResourcesData = lighthouseData.audits["render-blocking-resources"];
console.log(renderBlockingResourcesData);

// Extract information from Minimize Render-Blocking Resources
const renderBlockingResources = {
  title: renderBlockingResourcesData.title,
  description: renderBlockingResourcesData.description,
  score: renderBlockingResourcesData.score,
  displayValue: renderBlockingResourcesData.displayValue,
  items: renderBlockingResourcesData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedMs: item.wastedMs,
  })),
};


setRenderBlockingResourcesData(renderBlockingResources);

// Display information for "Main-Thread Work Breakdown"
const mainThreadWorkBreakdownData = lighthouseData.audits["mainthread-work-breakdown"];
console.log(mainThreadWorkBreakdownData);

// Extract information from Main-Thread Work Breakdown
const mainThreadWorkBreakdown = {
  title: mainThreadWorkBreakdownData.title,
  description: mainThreadWorkBreakdownData.description,
  score: mainThreadWorkBreakdownData.score,
  displayValue: mainThreadWorkBreakdownData.displayValue,
  items: mainThreadWorkBreakdownData.details.items.map(item => ({
    groupLabel: item.groupLabel,
    duration: item.duration,
  })),
};


setMainThreadWorkBreakdownData(mainThreadWorkBreakdown);

// Display information for "DOM Size"
const domSizeData = lighthouseData.audits["dom-size"];
console.log(domSizeData);

// Extract information from DOM Size
const domSize = {
  title: domSizeData.title,
  description: domSizeData.description,
  score: domSizeData.score,
  displayValue: domSizeData.displayValue,
  numericValue: domSizeData.numericValue,
  numericUnit: domSizeData.numericUnit,
  details: domSizeData.details.items.map(item => ({
    statistic: item.statistic,
    node: item.node,
    value: item.value.value,
  })),
};

setDomSizeData(domSize);


// Display information for "Modern Image Formats"
const modernImageFormatsData = lighthouseData.audits["modern-image-formats"];
console.log(modernImageFormatsData);

// Extract information from Modern Image Formats
const modernImageFormats = {
  title: modernImageFormatsData.title,
  description: modernImageFormatsData.description,
  score: modernImageFormatsData.score,
  scoreDisplayMode: modernImageFormatsData.scoreDisplayMode,
  displayValue: modernImageFormatsData.displayValue,
  numericValue: modernImageFormatsData.numericValue,
  numericUnit: modernImageFormatsData.numericUnit,
  details: modernImageFormatsData.details,
  items: modernImageFormatsData.details.items.map(item => ({
    url: item.url,
    totalBytes: item.totalBytes,
    wastedBytes: item.wastedBytes,
    node: item.node,
  })),
};


setModernImageFormatsData(modernImageFormats);


// Display information for "Uses Long Cache TTL"
const longCacheTTLData = lighthouseData.audits["uses-long-cache-ttl"];
console.log(longCacheTTLData);

// Extract information from Uses Long Cache TTL
const longCacheTTL = {
  title: longCacheTTLData.title,
  description: longCacheTTLData.description,
  score: longCacheTTLData.score,
  scoreDisplayMode: longCacheTTLData.scoreDisplayMode,
  displayValue: longCacheTTLData.displayValue,
  numericValue: longCacheTTLData.numericValue,
  numericUnit: longCacheTTLData.numericUnit,
  details: longCacheTTLData.details,
  items: longCacheTTLData.details.items.map(item => ({
    url: item.url,
    cacheLifetimeMs: item.cacheLifetimeMs,
  })),
};


setLongCacheTTLData(longCacheTTL);


// Display information for "font-display"
const fontDisplayData = lighthouseData.audits["font-display"];
console.log(fontDisplayData);

// Extract information from font-display
const fontDisplay = {
  title: fontDisplayData.title,
  description: fontDisplayData.description,
  score: fontDisplayData.score,
  scoreDisplayMode: fontDisplayData.scoreDisplayMode,
  details: fontDisplayData.details,
};


setFontDisplayData(fontDisplay);


// Display information for "uses-passive-event-listeners"
const usesPassiveEventListenersData = lighthouseData.audits["uses-passive-event-listeners"];
console.log(usesPassiveEventListenersData);

// Extract information from uses-passive-event-listeners
const usesPassiveEventListeners = {
  title: usesPassiveEventListenersData.title,
  description: usesPassiveEventListenersData.description,
  score: usesPassiveEventListenersData.score,
  scoreDisplayMode: usesPassiveEventListenersData.scoreDisplayMode,
  details: usesPassiveEventListenersData.details,
};


setUsesPassiveEventListenersData(usesPassiveEventListeners);

// Display information for "uses-optimized-images"
const usesOptimizedImagesData = lighthouseData.audits["uses-optimized-images"];
console.log(usesOptimizedImagesData);

// Extract information from uses-optimized-images
const usesOptimizedImages = {
  title: usesOptimizedImagesData.title,
  description: usesOptimizedImagesData.description,
  score: usesOptimizedImagesData.score,
  scoreDisplayMode: usesOptimizedImagesData.scoreDisplayMode,
  displayValue: usesOptimizedImagesData.displayValue,
  numericValue: usesOptimizedImagesData.numericValue,
  numericUnit: usesOptimizedImagesData.numericUnit,
  details: usesOptimizedImagesData.details,
};


setUsesOptimizedImagesData(usesOptimizedImages);


// Display information for "total-byte-weight"
const totalByteWeightData = lighthouseData.audits["total-byte-weight"];
console.log(totalByteWeightData);

// Extract information from total-byte-weight
const totalByteWeight = {
  title: totalByteWeightData.title,
  description: totalByteWeightData.description,
  score: totalByteWeightData.score,
  scoreDisplayMode: totalByteWeightData.scoreDisplayMode,
  displayValue: totalByteWeightData.displayValue,
  numericValue: totalByteWeightData.numericValue,
  numericUnit: totalByteWeightData.numericUnit,
  details: totalByteWeightData.details,
};

setTotalByteWeightData(totalByteWeight);



// Display information for "long-tasks"
const longTasksData = lighthouseData.audits["long-tasks"];
console.log(longTasksData);

// Extract information from long-tasks
const longTasks = {
  title: longTasksData.title,
  description: longTasksData.description,
  score: longTasksData.score,
  scoreDisplayMode: longTasksData.scoreDisplayMode,
  displayValue: longTasksData.displayValue,
  details: longTasksData.details,
};


setLongTasksData(longTasks);



// Display information for "layout-shift-elements"
const layoutShiftElementsData = lighthouseData.audits["layout-shift-elements"];
console.log(layoutShiftElementsData);

// Extract information from layout-shift-elements
const layoutShiftElements = {
  title: layoutShiftElementsData.title,
  description: layoutShiftElementsData.description,
  score: layoutShiftElementsData.score,
  scoreDisplayMode: layoutShiftElementsData.scoreDisplayMode,
  displayValue: layoutShiftElementsData.displayValue,
  numericValue: layoutShiftElementsData.numericValue,
  numericUnit: layoutShiftElementsData.numericUnit,
  details: layoutShiftElementsData.details,
};


setLayoutShiftElementsData(layoutShiftElements);


// Display information for "user-timings"
const userTimingsData = lighthouseData.audits["user-timings"];
console.log(userTimingsData);

// Extract information from user-timings
const userTimings = {
  title: userTimingsData.title,
  description: userTimingsData.description,
  score: userTimingsData.score,
  scoreDisplayMode: userTimingsData.scoreDisplayMode,
  displayValue: userTimingsData.displayValue,
  details: userTimingsData.details,
};


setUserTimingsData(userTimings);

// Display information for "server-response-time"
const serverResponseTimeData = lighthouseData.audits["server-response-time"];
console.log(serverResponseTimeData);

// Extract information from server-response-time
const serverResponseTime = {
  title: serverResponseTimeData.title,
  description: serverResponseTimeData.description,
  score: serverResponseTimeData.score,
  scoreDisplayMode: serverResponseTimeData.scoreDisplayMode,
  displayValue: serverResponseTimeData.displayValue,
  numericValue: serverResponseTimeData.numericValue,
  numericUnit: serverResponseTimeData.numericUnit,
  details: serverResponseTimeData.details,
};


setServerResponseTimeData(serverResponseTime);


// Display information for "critical-request-chains"
const criticalRequestChainsData = lighthouseData.audits["critical-request-chains"];
console.log(criticalRequestChainsData);

// Extract information from critical-request-chains
const criticalRequestChains = {
  title: criticalRequestChainsData.title,
  description: criticalRequestChainsData.description,
  score: criticalRequestChainsData.score,
  scoreDisplayMode: criticalRequestChainsData.scoreDisplayMode,
  displayValue: criticalRequestChainsData.displayValue,
  details: criticalRequestChainsData.details,
};

setCriticalRequestChainsData(criticalRequestChains);






// Display information for "network-requests"
const networkRequestsData = lighthouseData.audits["network-requests"];
console.log(networkRequestsData);

// Extract information from network-requests
const networkRequests = {
  title: networkRequestsData.title,
  description: networkRequestsData.description,
  score: networkRequestsData.score,
  scoreDisplayMode: networkRequestsData.scoreDisplayMode,
  displayValue: networkRequestsData.displayValue,
  details: networkRequestsData.details,
};

setNetworkRequestsData(networkRequests);


// Display information for "Avoid multiple page redirects"
const avoidRedirectsData = lighthouseData.audits["redirects"];
console.log(avoidRedirectsData);

// Extract information from avoid-multiple-page-redirects
const avoidRedirects = {
  title: avoidRedirectsData.title,
  description: avoidRedirectsData.description,
  score: avoidRedirectsData.score,
  scoreDisplayMode: avoidRedirectsData.scoreDisplayMode,
  displayValue: avoidRedirectsData.displayValue,
  numericValue: avoidRedirectsData.numericValue,
  numericUnit: avoidRedirectsData.numericUnit,
  details: avoidRedirectsData.details,
};

setAvoidRedirectsData(avoidRedirects);


// Display information for "uses-rel-preload"
const usesRelPreloadData = lighthouseData.audits["uses-rel-preload"];
console.log(usesRelPreloadData);

// Extract information from uses-rel-preload
const usesRelPreload = {
  title: usesRelPreloadData.title,
  description: usesRelPreloadData.description,
  score: usesRelPreloadData.score,
  scoreDisplayMode: usesRelPreloadData.scoreDisplayMode,
  displayValue: usesRelPreloadData.displayValue,
  numericValue: usesRelPreloadData.numericValue,
  numericUnit: usesRelPreloadData.numericUnit,
  details: usesRelPreloadData.details,
};

setUsesRelPreloadData(usesRelPreload);

// Display information for "efficient-animated-content"
const efficientAnimatedContentData = lighthouseData.audits["efficient-animated-content"];
console.log(efficientAnimatedContentData);

// Extract information from efficient-animated-content
const efficientAnimatedContent = {
  title: efficientAnimatedContentData.title,
  description: efficientAnimatedContentData.description,
  score: efficientAnimatedContentData.score,
  scoreDisplayMode: efficientAnimatedContentData.scoreDisplayMode,
  displayValue: efficientAnimatedContentData.displayValue,
  numericValue: efficientAnimatedContentData.numericValue,
  numericUnit: efficientAnimatedContentData.numericUnit,
  details: efficientAnimatedContentData.details,
};


setEfficientAnimatedContentData(efficientAnimatedContent);


// Display information for "duplicated-javascript"
const duplicatedJavascriptData = lighthouseData.audits["duplicated-javascript"];
console.log(duplicatedJavascriptData);

// Extract information from duplicated-javascript
const duplicatedJavascript = {
  title: duplicatedJavascriptData.title,
  description: duplicatedJavascriptData.description,
  score: duplicatedJavascriptData.score,
  scoreDisplayMode: duplicatedJavascriptData.scoreDisplayMode,
  displayValue: duplicatedJavascriptData.displayValue,
  numericValue: duplicatedJavascriptData.numericValue,
  numericUnit: duplicatedJavascriptData.numericUnit,
  details: duplicatedJavascriptData.details,
};

setDuplicatedJavascriptData(duplicatedJavascript);

// Display information for "third-party-facades"
const thirdPartyFacadesData = lighthouseData.audits["third-party-facades"];
console.log(thirdPartyFacadesData);

// Extract information from third-party-facades
const thirdPartyFacades = {
  title: thirdPartyFacadesData.title,
  description: thirdPartyFacadesData.description,
  score: thirdPartyFacadesData.score,
  scoreDisplayMode: thirdPartyFacadesData.scoreDisplayMode,
  displayValue: thirdPartyFacadesData.displayValue,
  numericValue: thirdPartyFacadesData.numericValue,
  numericUnit: thirdPartyFacadesData.numericUnit,
  details: thirdPartyFacadesData.details,
};


setThirdPartyFacadesData(thirdPartyFacades);


const lcpLazyLoadedItems = lighthouseData.audits["lcp-lazy-loaded"].details.items;
console.log("Largest Contentful Data",lcpLazyLoadedItems);


const largestContentPaintData = {
  title: lighthouseData.audits["lcp-lazy-loaded"].title,
  description: lighthouseData.audits["lcp-lazy-loaded"].description,
  score: lighthouseData.audits["lcp-lazy-loaded"].score,
  displayValue: lighthouseData.audits["lcp-lazy-loaded"].displayValue,
  items: lcpLazyLoadedItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};


setLargestContentPaintData(largestContentPaintData);


//Preload Largest Contentful Paint image
const prioritizeLCPImageItems = lighthouseData.audits["prioritize-lcp-image"].details.items;
console.log("Largest Contentful Data",prioritizeLCPImageItems);


const preloadLCPImageData = {
  title: lighthouseData.audits["prioritize-lcp-image"].title,
  description: lighthouseData.audits["prioritize-lcp-image"].description,
  score: lighthouseData.audits["prioritize-lcp-image"].score,
  displayValue: lighthouseData.audits["prioritize-lcp-image"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};


setPreloadLCPImageData(preloadLCPImageData);


// Display information for "legacy-javascript"
const legacyJavascriptData = lighthouseData.audits["legacy-javascript"];
console.log(legacyJavascriptData);


// Extract information from legacy-javascript
const legacyJavascript = {
  title: legacyJavascriptData.title,
  description: legacyJavascriptData.description,
  score: legacyJavascriptData.score,
  scoreDisplayMode: legacyJavascriptData.scoreDisplayMode,
  displayValue: legacyJavascriptData.displayValue,
  numericValue: legacyJavascriptData.numericValue,
  numericUnit: legacyJavascriptData.numericUnit,
  details: legacyJavascriptData.details,
};


setLegacyJavascriptData(legacyJavascript);  




// Display information for "bootup-time"

const bootupTimeData = lighthouseData.audits["bootup-time"];
console.log(legacyJavascriptData);


// Extract information from bootup-time
const bootupTime = {
  title: bootupTimeData.title,
  description: bootupTimeData.description,
  score: bootupTimeData.score,
  scoreDisplayMode: bootupTimeData.scoreDisplayMode,
  displayValue: bootupTimeData.displayValue,
  numericValue: bootupTimeData.numericValue,
  numericUnit: bootupTimeData.numericUnit,
  details: bootupTimeData.details,
};


setBootupTimeData(bootupTime);  


//Avoid non-composited animations
const NonCompositedAnimations = lighthouseData.audits["non-composited-animations"].details.items;
console.log("Largest Contentful Data",NonCompositedAnimations);


const NonCompositedAnimationsData = {
  title: lighthouseData.audits["non-composited-animations"].title,
  description: lighthouseData.audits["non-composited-animations"].description,
  score: lighthouseData.audits["non-composited-animations"].score,
  displayValue: lighthouseData.audits["non-composited-animations"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};
setNonCompositedAnimationsData(NonCompositedAnimationsData);  






//Enable text compression usesTextCompression
const usesTextCompression = lighthouseData.audits["uses-text-compression"].details.items;
console.log("Largest Contentful Data",usesTextCompression);


const usesTextCompressionData = {
  title: lighthouseData.audits["uses-text-compression"].title,
  description: lighthouseData.audits["uses-text-compression"].description,
  score: lighthouseData.audits["uses-text-compression"].score,
  displayValue: lighthouseData.audits["uses-text-compression"].displayValue,
  items: prioritizeLCPImageItems.map(item => ({
    path: item.node.snippet.match(/src="([^"]*)"/)[1]
  }))
};
setUsesTextCompressionData(usesTextCompressionData);  





//Avoids `document.write()`
const noDocumentWrite = lighthouseData.audits["no-document-write"].details.items;
console.log("Largest Contentful Data",noDocumentWrite);


const noDocumentWriteData = {
  title: lighthouseData.audits["no-document-write"].title,
  description: lighthouseData.audits["no-document-write"].description,  
  score: lighthouseData.audits["no-document-write"].score,
  displayValue: lighthouseData.audits["no-document-write"].displayValue
 
};
setNoDocumentWriteData(noDocumentWriteData); 


// Display information for "uses-rel-preconnect"
const usesRelPreconnectData = lighthouseData.audits["uses-rel-preconnect"];
console.log(usesRelPreconnectData);

// Extract information from uses-rel-preconnect
const usesRelPreconnect = {
  title: usesRelPreconnectData.title,
  description: usesRelPreconnectData.description,
  score: usesRelPreconnectData.score,
  scoreDisplayMode: usesRelPreconnectData.scoreDisplayMode,
  warnings: usesRelPreconnectData.warnings,
  details: usesRelPreconnectData.details,
};


setUsesRelPreconnectData(usesRelPreconnect);


const networkRequestsItems = networkRequestsData.details && networkRequestsData.details.items;
const totalUrls = networkRequestsItems ? networkRequestsItems.length : 0;


let totalByteWeightKiB = parseFloat(lighthouseData.audits['total-byte-weight'].displayValue.replace(/[^\d.]/g, ''));
let totalByteWeightMB = totalByteWeightKiB / 1024;
let newTotalByteWeightMB = totalByteWeightMB.toFixed(2);

      const lighthouseMetricsData = {
        'Performance': lighthouseData.categories.performance.score * 100,
        // 'Timing': lighthouseData.timing.total,
        'Total Blocking Time': lighthouseData.audits['total-blocking-time'].numericValue / 1000,
        'First Contentful Paint': lighthouseData.audits['first-contentful-paint'].displayValue,
        'Largest Contentful Paint': lighthouseData.audits['largest-contentful-paint'].displayValue,
        'Speed Index': lighthouseData.audits['speed-index'].displayValue,
        // 'Time To Interactive': lighthouseData.audits['interactive'].displayValue,
        // 'First Meaningful Paint': lighthouseData.audits['first-meaningful-paint'].displayValue,
        // 'Server Response Time': lighthouseData.audits['server-response-time'].displayValue,
        'Cumulative Layout Shift': lighthouseData.audits['cumulative-layout-shift'].displayValue,
        // 'First Input Delay': lighthouseData.audits['first-input-delay'].displayValue,
        // 'Time To First Byte': lighthouseData.audits['time-to-first-byte'].displayValue,
        // 'Estimated Input Latency': lighthouseData.audits['estimated-input-latency'].displayValue,
            'First Input Delay': lighthouseData.audits['max-potential-fid'].numericValue  / 1000,
        // 'First CPU Idle': lighthouseData.audits['first-cpu-idle'].displayValue,
         'Total Byte Weight': newTotalByteWeightMB,
        // 'DOM Size': lighthouseData.audits['dom-size'].numericValue,
        // 'Bootup Time': lighthouseData.audits['bootup-time'].displayValue,
        'Network Requests': totalUrls,
        // 'Network RTT': lighthouseData.audits['network-server-latency'].numericValue,
        // 'Redirects': lighthouseData.audits['redirects'].numericValue,
        // 'Interactive Elements': lighthouseData.audits['interactive-elements'].numericValue,
        // 'Unused CSS': lighthouseData.audits['unused-css-rules'].numericValue,
        // 'Total JavaScript Size': lighthouseData.audits['total-javascript-size'].numericValue,
        // 'Render Blocking Resources': lighthouseData.audits['render-blocking-resources'].numericValue,
     
      };
     

       
      setLighthouseMetrics(lighthouseMetricsData);
      showFullPageScreenshot(lighthouseData.fullPageScreenshot);
       
     
      const totalByteWeightValue = lighthouseData.audits['total-byte-weight'].numericValue;
      setTotalByteWeight(totalByteWeightValue);


    setTimeout(() => {
        // Once data is loaded, set isDataLoaded to true
        setIsDataLoaded(true);
        setLoadingMessage('Data loaded successfully');
      }, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingMessage("An error occurred while fetching data.");
    }
  };


  

  const buildQueryURL = (url, key) => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    let query = `${api}?url=${encodeURIComponent(url)}&strategy=${selectedDevice}&category=performance`; // Include selected device type

    if (key !== "") {
      query += `&key=${key}`;
    }

    return query;
  };
  

  const showFullPageScreenshot = (screenshotData) => {
    setScreenshot(screenshotData.screenshot.data);
  };

  const renderTable = (metrics) => {
    const fcpValue = metrics['First Contentful Paint'];
    const lcpValue = metrics['Largest Contentful Paint'];
    const speedIndexValue = metrics['Speed Index'];
    const clsValue = metrics['Cumulative Layout Shift'];
    const tbtValue = metrics['Total Blocking Time'];
    const fidValue = metrics['First Input Delay'];
    
    const fcpCategory = categorizeFCP(parseFloat(fcpValue));
    const lcpCategory = categorizeLCP(parseFloat(lcpValue));
    const speedIndexCategory = categorizeSpeedIndex(parseFloat(speedIndexValue));
    const clsCategory = categorizeCLS(parseFloat(clsValue));
    const tbtCategory = categorizeTBT(parseFloat(tbtValue));
    const fidCategory = categorizeFID(parseFloat(fidValue));

    console.log('Latest value one', fcpValue);
 
    return (
      <table>
        <thead>
          <tr>
            <th>Metrics</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(metrics).map((key, index) => {
            const colorCategory =
              key === 'Total Blocking Time'
                ? tbtCategory
                : key === 'First Input Delay'
                ? fidCategory
                : key === 'First Contentful Paint'
                ? fcpCategory
                : key === 'Largest Contentful Paint'
                ? lcpCategory
                : key === 'Speed Index'
                ? speedIndexCategory
                : key === 'Cumulative Layout Shift'
                ? clsCategory
                : '';
    
            const displayValue =
              key === 'First Input Delay'
                ? `${metrics[key].toFixed(2)} s (${colorCategory})` // Add "s" next to value
                : key === 'Total Blocking Time'
                ? `${metrics[key].toFixed(2)} s (${colorCategory})`
                : key === 'First Contentful Paint' ||
                  key === 'Largest Contentful Paint' ||
                  key === 'Speed Index' ||
                  key === 'Cumulative Layout Shift'
                ? `${metrics[key]} (${colorCategory})`
                : metrics[key];
    
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  {key === 'Total Blocking Time' ||
                  key === 'First Input Delay' ||
                  key === 'First Contentful Paint' ||
                  key === 'Largest Contentful Paint' ||
                  key === 'Speed Index' ||
                  key === 'Cumulative Layout Shift' ? (
                    <span style={{ color: getColorBasedOnCategory(colorCategory) }}>
                      {displayValue}
                    </span>
                  ) : (
                    displayValue
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
 
 


// Function to categorize FCP, LCP, Speed Index, and CLS values
const categorizeTBT = (tbtValue) => {
  if (tbtValue <= 0.2) {
    return 'Good';
  } else if (tbtValue > 0.2 && tbtValue <= 0.6) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};

const categorizeFID = (fidValue) => {
  if (fidValue <= 0.1) {
    return 'Good';
  } else if (fidValue > 0.1 && fidValue <= 0.3) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};

const categorizeFCP = (fcpValue) => {
  if (fcpValue <= 1800) {
    return 'Good';
  } else if (fcpValue > 1800 && fcpValue <= 3000) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeLCP = (lcpValue) => {
  if (lcpValue <= 2500) {
    return 'Good';
  } else if (lcpValue > 2500 && lcpValue <= 4000) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeSpeedIndex = (speedIndexValue) => {
  if (speedIndexValue <= 3.4) {
    return 'Good';
  } else if (speedIndexValue > 3.4 && speedIndexValue <= 5.8) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


const categorizeCLS = (clsValue) => {
  if (clsValue <= 0.1) {
    return 'Good';
  } else if (clsValue > 0.1 && clsValue <= 0.25) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
};


// Function to get color based on category
const getColorBasedOnCategory = (category) => {
  switch (category) {
    case 'Good':
      return 'green';
    case 'Needs Improvement':
      return 'orange';
    case 'Poor':
      return 'red';
    default:
      return '';
  }
};
const sortNetworkRequests = (items) => {
  return items.sort((a, b) => {
    if (a.priority === "Low" && b.priority !== "Low") {
      return -1; // Low priority comes first
    } else if (a.priority !== "Low" && b.priority === "Low") {
      return 1; // Non-Low priority comes first
    } else if (a.priority === "Low" && b.priority === "Low") {
      // If both are Low priority, sort by resource size in descending order
      return b.resourceSize - a.resourceSize;
    } else {
      // If priorities are the same, sort by resource size in ascending order
      return a.resourceSize - b.resourceSize;
    }
  });
};



  const bytesToKiB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  };

  
  
  return (
    <div className="container" id="main">
      <h1>Webpage Speed Test</h1>
      <form onSubmit={getPageSpeedInsights}>
        <div>
          <label>Enter URL to Test Page Speed:</label>
          <input id="url" name="url" type="text" />

        
          <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
          </select>

         

          <button type="submit">Submit</button>
        </div>
      </form>
      <p id="loading">{loadingMessage}</p>
      {isDataLoaded && (
      <div className="container" id="results">
        

        {/* Display 'Performance' metric separately */}
          { lighthouseMetrics['Performance'] !== undefined && (
            <div className="result-section">
              <h2>Overall score</h2>
              <p>
                Performance Score: {lighthouseMetrics['Performance'].toFixed(0)}
              </p>
              {/* Add conditional sentences based on the performance score and selected device */}
             <p> {getPerformanceSentence(selectedDevice, lighthouseMetrics['Performance'])}</p>
            </div>
          )}
      
        {Object.keys(lighthouseMetrics).length > 0 && (
          <div className="result-section">
            <h2>Lighthouse Results</h2>
            {renderTable(filterOutPerformanceMetric(lighthouseMetrics))}
         
            {/*{renderBarChart(lighthouseMetrics, 'Lighthouse Metrics')}*/}
            <br/>
            <br/>
          </div>
        )}

        {/* Add the following code to display CO2e per new visit */}
        {totalByteWeight > 0 && (
          <div className="result-section">
            <h2>CO2e per New Visit</h2>
            <p>Total Byte Weight: {bytesToKiB(newTotalByteWeightMB)} MB</p>
            <p>CO2e per New Visit: {calculateCO2ePerNewVisit(totalByteWeight)} gm</p>
          </div>
        )}

        {Object.keys(thumbnailData).length > 0 && (
          <div className="result-section">
            <h2>Filmstrip</h2>
            <ul style={{display:'flex', listStyle:'none', width:'100%'}}>
              {thumbnailData.items.map((item, index) => (
                <li key={index}>
                <img src={item.data} alt="Full Page Screenshot" />
                </li>
              ))}
            </ul>
            <br/>
            <br/>
          </div>
          )}
          
          {sortedResultSections && (
          <div>
          <h2>Opportunities</h2>
          {sortedResultSections.map((resultSection, index) => (
            resultSection.title !== 'Network Requests'  && (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography style={{ color: getScoreColor(resultSection.data.score) }}>{`${index + 1}. ${resultSection.title}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p>{resultSection.data.description}</p>
                  <p>Score: {resultSection.data.score}</p>
                  {/* Render common details for the result section */}
                  {renderResultDetails(resultSection)}
                  {/* ... render other details for the result section */}
                </div>
              </AccordionDetails>
            </Accordion>
          )
          ))}
          <br/>
          <br/>
          </div>
        )}
        


        {Object.keys(networkRequestsData).length > 0 && (
          <div className="result-section">
            <h3>{networkRequestsData.title}</h3>
            <p>{networkRequestsData.description}</p>
            <p>Score: {networkRequestsData.score}</p>
            <p>Score Display Mode: {networkRequestsData.scoreDisplayMode}</p>
            {networkRequestsData.details && (
              <div>
                <h3>Details:</h3>
                {networkRequestsData.details.items && (
                  <table>
                    <thead>
                      <tr>
                        <th>URL</th>
                        <th>Resource Type</th>
                        <th>Resource Size</th>
                        <th>Network Request Time</th>
                        <th>Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortNetworkRequests(networkRequestsData.details.items).map((item, index) => (
                        <tr key={index}>
                          <td>
                            <a target="_blank" href={item.url} rel="noreferrer">
                              {item.url}
                            </a>
                          </td>
                          <td>{item.resourceType}</td>
                          <td>{item.resourceSize}</td>
                          <td>{item.networkRequestTime}</td>
                          <td>{item.priority}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            <hr />
          </div>
        )}

        {screenshot && (
          <div className="result-section">
            <h2>Screenshot</h2>
            <img src={screenshot} alt="Full Page Screenshot" />
          </div>
        )}

      
      </div>

      )}
    </div>
    
  );
};

function filterOutPerformanceMetric(metrics) {
  // Filter out the 'Performance' metric
  const filteredMetrics = Object.fromEntries(
    Object.entries(metrics).filter(([key]) => key !== 'Performance')
  );
  return filteredMetrics;
}

function getPerformanceSentence(device, score) {
  if (device === 'mobile') {
    if (score >= 0 && score <= 25) {
      return <p>Very poor as compared to many Shopify stores.</p>;
    } else if (score >= 26 && score <= 40) {
      return <p>Slower than many Shopify stores.</p>;
    } else if (score >= 41 && score <= 59) {
      return <p>Similar speed as many Shopify stores.</p>;
    } else if (score >= 60) {
      return <p>Faster than many Shopify stores.</p>;
    }
  } else if (device === 'desktop') {
    if (score >= 0 && score <= 65) {
      return <p>Slower than many Shopify stores.</p>;
    } else if (score >= 66 && score <= 89) {
      return <p>Similar speed as many Shopify stores.</p>;
    } else if (score >= 90) {
      return <p>Faster than many Shopify stores.</p>;
    }
  }

  // Default return if device is neither mobile nor desktop
  return null;
}


// Function to determine the color based on the score value
const getScoreColor = (score) => {
  if (score === 0) {
    return "red";
  } else if (score === 1) {
    return "green";
  } else if (score === 0.5) {
    return "orange";
  } else {
    return "gray"; // Set a default color if needed
  }
};


export default PageSpeedInsights;
