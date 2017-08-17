import * as React from 'react';
import * as TinyMCE from 'tinymce';

interface thisProps{
	id: string,
	priorContent: string | null,
	/**
	 * Function to call to set state with this
	 * components content
	 */
	onEditorChange,
};


class TinymceComponent extends React.Component<thisProps, any>{
	constructor(props){
		super(props);

		this.state ={
			editor: null
		};

	};

	componentDidMount(){
		TinyMCE.init({
			selector: '#tiny-mce-editor',
			setup: editor => {
				// editor.setContent("<span>Test hello! </span> html", {format: 'raw'});
				this.setState({ editor: editor });
				editor.on('keyup change', () =>{
					const content = editor.getContent();
					this.props.onEditorChange(content);
				})
			},
			init_instance_callback: (editor) =>{
				if(this.props.priorContent !== null){
					// let contentString = this.props.priorContent;
					editor.setContent(this.props.priorContent);
				}
			}
		});

		// console.log(this.state.editor);
		// TinyMCE.EditorManager.get('tiny-mce-editor').setContent('hello', {format: 'raw'});
		// this.state.editor.get('tiny-mce-editor').setContent('helo');
		// if(this.props.priorContent){
		// 	TinyMCE.get('')
		// 	editor.setContent(this.props.priorContent, {format: 'raw'});
		// }


	}

	componentWillUnmount(){
		TinyMCE.EditorManager.remove(this.state.editor);
	}

	render(){

		return(
			<textarea id='tiny-mce-editor' />
		)
	}
}

export default TinymceComponent;