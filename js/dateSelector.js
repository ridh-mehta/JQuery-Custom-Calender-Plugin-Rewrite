$.fn.dateSelector = function () {
    'use strict';
    return this.each(function () {
        var container = $(this),
            $trYear,
            $trMonth,
            $trDate,
            $tdYear,
            $tdMonth,
            $tdDate,
            $monthTable = $('<table></table>').addClass('monthTable'),
            $yearTable = $('<table></table>').addClass('yearTable'),
            $dateTable = $('<table></table>').addClass('dateTable'),
            $saveButton = $('<button>Save</button>').addClass('save-button'),
            type = {
                year: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
                month: [{monthNo: '01', monthName: 'January'},
                    {monthNo: '02', monthName: 'February'},
                    {monthNo: '03', monthName: 'March'},
                    {monthNo: '04', monthName: 'April'},
                    {monthNo: '05', monthName: 'May'},
                    {monthNo: '06', monthName: 'June'},
                    {monthNo: '07', monthName: 'July'},
                    {monthNo: '08', monthName: 'August'},
                    {monthNo: '09', monthName: 'September'},
                    {monthNo: '10', monthName: 'October'},
                    {monthNo: '11', monthName: 'November'},
                    {monthNo: '12', monthName: 'December'}],
                date: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            },
            i,
            j,
            reset = function () {
                i = 0;
                j = 0;
            };
        container.append("<div class='year'></div>");
        container.append("<div class='month'></div>");
        container.append("<div class='date'></div>");
        container.append($saveButton);
        
        var $year =  $('.year', container),
            $month =  $('.month', container),
            $date =  $('.date', container);
        
        $year.append("<div class='year-label'>Year:</div>");
        for (i = 0; i < 4; i = i + 1) {
            $trYear = $('<tr></tr>');
            for (j = 4 * i; j < 4 * i + 4; j = j + 1) {
                $tdYear = $('<td></td>').text(type.year[j]);
                $trYear.append($tdYear);
            }
            $yearTable.append($trYear);
        }
        $year.append($yearTable);
        reset ();
        $month.append("<div class='month-label'>Month:</div>");
        for (i = 0; i < 3; i = i + 1) {
            $trMonth = $('<tr></tr>');
            for (j = 4 * i; j < 4 * i + 4; j = j + 1) {
                var monthNo = type.month[j].monthNo;
                $tdMonth = $('<td></td>').text(type.month[j].monthName).attr('monthNo', monthNo);
                $trMonth.append($tdMonth);
            }
            $monthTable.append($trMonth);
        }
        $month.append($monthTable);
        reset ();
        $date.append("<div class='date-label'>Date:</div>");
        for (i = 0; i < 5; i = i + 1) {
            $trDate = $('<tr></tr>');
            for (j = 7 * i; j < 7 * i + 7 && j < 31; j = j + 1) {
                $tdDate = $('<td></td>').text(type.date[j]);
                $trDate.append($tdDate);
            }
            $dateTable.append($trDate);
        }
        $date.append($dateTable);
        
    });
};
