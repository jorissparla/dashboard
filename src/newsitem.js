import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {fetchNewsItem, updateNews} from './actions/index'

const inputField = field => {
    const classw = "input-field col s" + (field.width || "4");
    return (
        <div className={classw}>
            <input {...field.input} placeholder={field.placeholder} type={field.type}/>
        </div>
    )
}

const inputImageField = field => {
  console.log(field)
  const classw = "input-field col s" + (field.width || "4");
  return (
    <div>
      <div className={classw}>
        <input {...field.input} placeholder={field.placeholder} type={field.type}/>

      </div>
      <div className="col s2">
        <img src={field.input.value} alt="" width="200px"/>
      </div>
    </div>
  )
}

const doSubmit = values => {
    updateNews(values);
    browserHistory.push('/news')
}

class NewsItem extends Component {

    componentDidMount() {
        console.log(this.props)
        this
            .props
            .fetchNewsItem(this.props.params.id)
            let initials = this.props.news[0]
            if (initials) {
                initials.expire_date = initials.expire_date.substr(0,10)
            }
            console.log('o:',initials)
          //  
            this.props.initialize(initials)
        // console.log(this.props)
    }


    render() {
        const { handleSubmit, fetchNewsItem, submitting} = this.props
        if (!this.props.news) {
            return <div>Loading...</div>
        }
        const news = this.props.news[0];
        return (
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit(doSubmit)}>
                    <div className="row">
                        <Field name="title" component={inputField} placeholder="title"/>
                        <div className="col s4">
                            <p>
                                <button type="submit" className="btn btn-primary blue">Save</button>
                                <Link to="/news" type="cancel" className="btn btn-primary black">Cancel</Link>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <Field
                            name="body"
                            component={inputField}
                            type="text"
                            placeholder="Description"
                            width={12}/>
                    </div>
                    <div className="row">
                        <Field
                            name="img"
                            id="img"
                            type="text"
                            placeholder="Image"
                            component={inputImageField}
                            width={8}/>
                        <div>

                        </div>
                    </div>
                    <div className="row">
                        <Field
                            name="link"
                            component={inputField}
                            type="text"
                            placeholder="Link"
                            width={8}/>
                        <Field
                            name="link_text"
                            component={inputField}
                            type="text"
                            placeholder="Description"/>
                    </div>
                    <div className="row">
                        <div className="left">
                            Expires:
                        </div>
                        <Field
                            name="expire_date"
                            component={inputField}
                            type="date"
                            placeholder="expire_date"
                            width={2}/>
                    </div>
                </form>
            </div>

        );
    }
}

const replaceDate = (values) => {
    if (values) {
        values.expire_date = values.expire_date.substr(0,10)
    } 
    return values
}

const mapStateToProps = (state) => {
    return {news: state.summary.news,
            initialValues: replaceDate(state.summary.news[0])}
}

NewsItem = reduxForm({form:'newsitem'})(NewsItem)
export default // NewsItem = reduxForm(    {form: 'newsitem'},
        connect(mapStateToProps, {fetchNewsItem, updateNews})(NewsItem);