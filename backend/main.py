from flask import Flask, render_template

app = Flask('__main__')


@app.route('/')
def index():
    return "Landing Page"


@app.route('/hello')
def hello():
    return render_template('hello.html')


#if __name__ == '__main__':
app.run(debug=True)