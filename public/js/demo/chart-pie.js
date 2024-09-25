// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

create_pie_chart = (canvas_id, labels, value) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Gender',
            data: value,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Configuration options
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        },
    };

    // Render the pie chart
    const myPieChart = new Chart(
        document.getElementById(canvas_id),
        config
    );
}

// Gender
get_gender_report = () => {
    fetch("/api/get_gender").then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(result => {
        gender = [];
        count = [];
        total_count = 0;

        result.forEach(data => {
            gender.push(data.gender);
            count.push(data.count);

            total_count += data.count;
            
            document.getElementById(data.gender.toLowerCase() + "-respondents-count").innerHTML = data.count;
        });

        document.getElementById("total-respondents-count").innerHTML = total_count;

        create_pie_chart('feedback_result_gender', gender, count);

        get_age_bracket_report();
    });
}

// Age Bracket
get_age_bracket_report = () => {
    fetch("/api/get_age_bracket").then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(result => {
        age_bracket = [];
        count = [];
    
        result.forEach(data => {
            age_bracket.push(data.age_bracket);
            count.push(data.count);
        });
    
        create_pie_chart('feedback_result_age_bracket', age_bracket, count);

        get_leave_reason_report();
    });
}


// Leave Reason
get_leave_reason_report = () => {
    fetch("/api/get_count").then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(result => {
        count = result.count
    
        fetch("/api/get_reason").then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(result => {
            result.forEach(data => {    
                percentage = ((data.count / count) * 100).toFixed(2);
                id = (data.leave_reason).toLowerCase().replaceAll(" ", "-");
    
                document.getElementById('reason-percentage-' + id).innerHTML = percentage + "%";
                document.getElementById('reason-progress-bar-' + id).style.width = percentage + "%";
            });
        });
    });
}

get_gender_report();