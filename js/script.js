$(document).ready(function () {
    'use strict';
    $('.container').dateSelector();
    var yearSelected = null,
        monthSelected = null,
        dateSelected = null,
        monthNumber = null,
        monthHas31Days,
        yearValid,
        monthValid,
        dateValid,
        isLeapYearSelected,
        
        initialize = function () {
            $('.container .month').hide();
            $('.container .date').hide();
            $('.save-button').attr('disabled', 'disabled');
            $('.save-button').click(function () {
                alert(yearSelected + '-' + monthNumber + '-' + dateSelected);
            });
        },
        
        isYearLeap = function () {
            if (yearSelected !== null && yearSelected !== '' && yearSelected !== undefined && yearSelected % 4 === 0) {
                if ((yearSelected % 100 === 0 && yearSelected % 400 === 0) || (yearSelected % 4 === 0 && yearSelected % 100 !== 0)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        
        validate = function () {
            yearValid = (yearSelected !== null && yearSelected !== '' && yearSelected !== undefined);
            monthValid = (monthSelected !== null && monthSelected !== '' && monthSelected !== undefined);
            dateValid = (dateSelected !== null && dateSelected !== '' && dateSelected !== undefined);
            monthHas31Days = (monthSelected === 'January' || monthSelected === 'March' || monthSelected === 'May' || monthSelected === 'July' ||  monthSelected === 'August' || monthSelected === 'October' || monthSelected === 'December');
            isLeapYearSelected = isYearLeap();
            
            if (!monthHas31Days && monthValid) {
                if (dateSelected === '31') {
                    dateSelected = null;
                    $('.dateTable tr:nth-last-child(1) td:nth-last-child(1)').removeClass('selected');
                }
                if (monthSelected === 'February') {
                    if (dateSelected === '30' && dateValid) {
                        dateSelected = null;
                        $('.dateTable tr:nth-last-child(1) td:nth-last-child(2)').removeClass('selected');
                    }
                    if (isLeapYearSelected) {
                        $('.dateTable tr:nth-last-child(1) td:nth-last-child(3)').removeClass('disable-date');
                        $('.dateTable tr:nth-last-child(1) td:nth-last-child(-n+2)').addClass('disable-date');
                    } else {
                        if (dateSelected === '29' && dateValid) {
                            dateSelected = null;
                            $('.dateTable tr:nth-last-child(1) td:nth-last-child(3)').removeClass('selected');
                        }
                        $('.dateTable tr:nth-last-child(1) td:nth-last-child(-n+3)').addClass('disable-date');
                    }
                } else {
                    $('.dateTable tr:nth-last-child(1) td:nth-last-child(-n+3)').removeClass('disable-date');
                    $('.dateTable tr:nth-last-child(1) td:nth-last-child(1)').addClass('disable-date');
                }
            } else {
                $('.dateTable tr:nth-last-child(1) td:nth-last-child(-n+3)').removeClass('disable-date');
            }
            
            if (yearValid && monthValid && dateSelected !== null) {
                return true;
            } else {
                return false;
            }
        },
        
        enableSaveButton = function () {
            $('.save-button').removeAttr('disabled');
        },
        disableSaveButton = function () {
            $('.save-button').attr('disabled', 'disabled');
        };
        
    $('.year .yearTable td').click(function () {
        $('.year .yearTable td').removeClass('selected');
        $(this).addClass('selected');
        yearSelected = this.innerHTML;
        $('.container .month').show();
        if (validate()) {
            enableSaveButton();
        } else {
            disableSaveButton();
        }
    });
    $('.month .monthTable td').click(function () {
        $('.month .monthTable td').removeClass('selected');
        $(this).addClass('selected');
        monthSelected = this.innerHTML;
        monthNumber = this.getAttribute('monthNo');
        $('.container .date').show();
        if (validate()) {
            enableSaveButton();
        } else {
            disableSaveButton();
        }
    });
    $('.date .dateTable td').click(function () {
        $('.date .dateTable td').removeClass('selected');
        $(this).addClass('selected');
        dateSelected = this.innerHTML;
        if (validate()) {
            enableSaveButton();
        } else {
            disableSaveButton();
        }
    });
    initialize();
});