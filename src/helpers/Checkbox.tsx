function CheckBox(name, label, onChange, initial=false){
    this.name = name;
    this.label = label;
    this.key = name;
    this.value = initial;
    this.toggle = () => {
        this.value = !this.value;
    }

    this.render = () => (
        <div key={`task_${this.key}`}>
            <input id={`task_${this.name}`} 
                   type="checkbox" 
                   key={this.name} 
                   value={this.name} 
                   checked={this.value} 
                   onClick={() => this.toggle()}
                   onChange={onChange}
                   />
            <label htmlFor={`task_${this.name}`}>
                {this.label}
            </label>
        </div>
    )
}

export {CheckBox}