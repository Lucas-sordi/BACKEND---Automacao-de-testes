const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: 'cypress/cucumber-json/',
	reportPath: 'reports/',
    openReportInBrowser: true,
    displayReportTime: true,
    pageFooter: "<div></div>",
    hideMetadata: true
});