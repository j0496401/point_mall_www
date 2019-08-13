import React from 'react';

import ItemBox from './ItemBox';
import { inject } from 'mobx-react';

@inject('httpService')
class CategotyItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.indexItems();
    }

    componentDidUpdate(preProps) {
        if (this.props.match.params.categoryId !== preProps.match.params.categoryId) {
            this.indexItems();
        }
    }

    indexItems() {
        const categoryId = this.props.match.params.categoryId;
        this.props.httpService.indexCategoryItems(categoryId)
            .then(items => {
                this.setState({
                    items
                });
            });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item={item} />
            )
        });

        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default CategotyItems;