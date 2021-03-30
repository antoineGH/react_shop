import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import Flags from 'country-flag-icons/react/3x2'
import { LanguageContext } from '../../language/LanguageContext'

export default function Footer(props) {
	const { language } = props
	const { dictionary } = useContext(LanguageContext)

	return (
		<div className='footer'>
			<Row className='justify-content-center row_footer'>
				<Col md={11}>
					<Row className='logo_font_footer ml-sm-0 text-center text-sm-left'>
						<Col>{'Louis Vuitton'.toUpperCase()}</Col>
					</Row>
				</Col>
			</Row>
			<Row className='justify-content-center text-center text-md-left' style={{ marginRight: '0' }}>
				<Col md={11}>
					<Row>
						<Col md={3} className='ml-sm-4'>
							{language === 'en-US' ? (
								<p className='font_footer'>
									United States <Flags.US title='United States' className='flag_us mb-2 ml-1' />
								</p>
							) : (
								<p className='font_footer_CN'>
									中国 <Flags.CN title='China' className='flag_cn mb-1 ml-1' />
								</p>
							)}
						</Col>
						<Col md={3}>
							<p className={language === 'zh-CN' ? 'font_footer_CN' : 'font_footer'}>{dictionary.contact_us}</p>
						</Col>
						<Col md={3}>
							<p className={language === 'zh-CN' ? 'font_footer_CN' : 'font_footer'}>{dictionary.legal_notice}</p>
						</Col>
						<Col md={2}>
							<p className={language === 'zh-CN' ? 'font_footer_CN' : 'font_footer'}>{dictionary.sitemap}</p>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}
